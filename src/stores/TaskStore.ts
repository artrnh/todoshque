import { action, observable } from 'mobx';
import * as moment from 'moment';

import firebase from '../utils/firebase';

export interface IAddTaskFormFields {
  addTask: string;
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

  loadItems(): void;
  updateItems(newItems: ITask[]): void;
  addTask(fields: IAddTaskFormFields): void;
  deleteTask(id: string): void;
  completeTask(id: string): void;
}

class TaskStore implements ITaskStore {
  @observable public items: ITask[] = [];
  private dbRef: firebase.database.Reference = firebase.database().ref();

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
    if (!fields.addTask.trim()) return;

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
  public async completeTask(id: string) {
    const selectedTask = this.items.find((task) => task.id === id);

    await this.dbRef.child(`items/${id}`).set({
      ...selectedTask,
      completed: !selectedTask.completed,
      createdAt: selectedTask.createdAt.toJSON(),
      completedAt: moment().toJSON(),
    });
  }
}

export default TaskStore;
