import { action, computed, observable } from 'mobx';
import * as moment from 'moment';

import firebase from '../utils/firebase';

export interface IAddTaskFormFields {
  addTask: string;
}

export interface ITaskEditFormFields {
  description: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  createdAt: moment.Moment;
  completed: boolean;
  completedAt: moment.Moment;
}

export interface ITaskStore {
  items: ITask[];
  filteredItems: ITask[];
  activeFilter: string;
  isEmpty: boolean;

  applyFilter(filter: string): void;
  loadItems(): void;
  updateItems(newItems: ITask[]): void;
  addTask(fields: IAddTaskFormFields): void;
  deleteTask(id: string): void;
  toggleTask(id: string): void;
  searchTasks(query: string): void;
  editTask(id: string): (fields: ITaskEditFormFields) => void;
}

class TaskStore implements ITaskStore {
  @observable public items: ITask[] = [];
  @observable public activeFilter: string = 'all';
  @observable public searchQuery: string = '';
  private dbRef: firebase.database.Reference = firebase.database().ref();

  @computed
  get filteredItems() {
    const searched = this.items.filter((task) => task.title.toLowerCase().includes(this.searchQuery));

    switch (this.activeFilter) {
      case 'active': return searched.filter((task) => !task.completed);
      case 'completed': return searched.filter((task) => task.completed);
      default: return searched;
    }
  }

  @computed
  get isEmpty() {
    return this.items.length === 0;
  }

  @action.bound
  public applyFilter(filter: string) {
    this.activeFilter = filter;
  }

  @action.bound
  public loadItems() {
    this.dbRef.child('items').on('value', (snapshot) => {
      const items = snapshot.val() || [];

      this.updateItems(
        Object.entries(items).map(([key, task]: [string, ITask]) => ({
          ...task,
          id: key,
          createdAt: moment(task.createdAt),
          completedAt: moment(task.completedAt),
        })),
      );
    });
  }

  @action.bound
  public updateItems(newItems: ITask[]) {
    this.items = newItems;
  }

  @action.bound
  public async addTask(fields: IAddTaskFormFields) {
    if (!fields.addTask || !fields.addTask.trim()) return;

    await this.dbRef.child('items').push({
      title: fields.addTask.trim(),
      description: '',
      createdAt: moment().toJSON(),
      completed: false,
      completedAt: null,
    });
  }

  @action.bound
  public async deleteTask(id: string) {
    await this.dbRef.child(`items/${id}`).remove();
  }

  @action.bound
  public async toggleTask(id: string) {
    const selectedTask = this.items.find((task) => task.id === id);

    await this.dbRef.child(`items/${id}`).set({
      ...selectedTask,
      completed: !selectedTask.completed,
      createdAt: selectedTask.createdAt.toJSON(),
      completedAt: moment().toJSON(),
    });
  }

  @action.bound
  public searchTasks(query: string) {
    this.searchQuery = query.trim().toLowerCase();
  }

  @action.bound
  public editTask(id: string) {
    return (fields: ITaskEditFormFields) => {
      const editingTask = this.items.find((task) => task.id === id);

      this.dbRef.update({
        [`/items/${id}`]: {
          ...editingTask,
          createdAt: editingTask.createdAt.toJSON(),
          completedAt: editingTask.completedAt.toJSON(),
          ...fields,
        },
      });
    };
  }
}

export default TaskStore;
