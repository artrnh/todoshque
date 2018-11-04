import { action, computed, observable, runInAction } from 'mobx';
import * as shortid from 'shortid';

import Task, { ITask } from 'Models/Task';
import firebase from 'Utils/firebase';

export interface IAddTaskFormFields {
  name: string;
}

export interface ITaskEditFormFields {
  description: string;
}

export const enum FilterTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface ITaskStore {
  items: ITask[];
  loading: boolean;
  filteredItems: ITask[];
  activeFilter: string;
  isEmpty: boolean;
  editingModalOpened: boolean;

  applyFilter(filter: string): void;
  loadItems(): void;
  updateItems(newItems: ITask[]): void;
  addTask(fields: IAddTaskFormFields): void;
  deleteTask(id: string): void;
  toggleTask(id: string): void;
  searchTasks(query: string): void;
  editTask(id: string, fields: ITaskEditFormFields): void;
  changeEditingModalState(state?: boolean): void;
}

class TaskStore implements ITaskStore {
  @observable
  public items: ITask[] = [];
  @observable
  public loading: boolean = false;
  @observable
  public activeFilter: string = FilterTypes.All;
  @observable
  public searchQuery: string = '';
  @observable
  public editingModalOpened: boolean = false;
  private dbRef: firebase.database.Reference = firebase.database().ref();

  @computed
  get filteredItems() {
    const searched = this.items.filter(task =>
      task.name.toLowerCase().startsWith(this.searchQuery),
    );

    switch (this.activeFilter) {
      case FilterTypes.Active:
        return searched.filter(task => !task.completed);
      case FilterTypes.Completed:
        return searched.filter(task => task.completed);
      default:
        return searched;
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
    this.loading = true;

    this.dbRef.child('items').on('value', snapshot => {
      const items = snapshot.val() || [];

      runInAction(() => {
        this.updateItems(
          Object.values(items).map((task: ITask) =>
            new Task(task.id, task.name).update(task).toJS(),
          ),
        );

        this.loading = false;
      });
    });
  }

  @action.bound
  public updateItems(newItems: ITask[]) {
    this.items = newItems;
  }

  @action.bound
  public async addTask({ name }: IAddTaskFormFields) {
    if (!name.trim()) return;

    const id = shortid.generate();
    await this.dbRef.child(`items/${id}`).set(new Task(id, name.trim()).toFB());
  }

  @action.bound
  public async deleteTask(id: string) {
    await this.dbRef.child(`items/${id}`).remove();
  }

  @action.bound
  public async toggleTask(id: string) {
    const selectedTask = this.items.find(task => task.id === id);

    await this.dbRef
      .child(`items/${id}`)
      .set(selectedTask.toggleComplete().toFB());
  }

  @action.bound
  public searchTasks(query: string) {
    this.searchQuery = query.trim().toLowerCase();
  }

  @action.bound
  public async editTask(id: string, fields: ITaskEditFormFields) {
    const editingTask = this.items.find(task => task.id === id);

    await this.dbRef
      .child(`items/${id}`)
      .set(editingTask.update(fields as ITask).toFB());
  }

  @action.bound
  public changeEditingModalState(state = true) {
    this.editingModalOpened = state;
  }
}

export default TaskStore;
