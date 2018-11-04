import * as moment from 'moment';

export interface ITask {
  id: string;
  name: string;
  description: string;
  createdAt: moment.Moment;
  completed: boolean;
  completedAt: moment.Moment;

  update(updates: ITask): this;
  toFB(): this;
  toJS(): this;
  toggleComplete(): this;
}

class Task implements ITask {
  public id: string;
  public name: string;
  public description: string;
  public createdAt: moment.Moment;
  public completed: boolean;
  public completedAt: moment.Moment;

  constructor(name: string) {
    this.name = name;
    this.description = '';
    this.createdAt = moment();
    this.completed = false;
    this.completedAt = null;
  }

  public update(updates: ITask) {
    Object.entries(updates).forEach(([key, value]) => {
      this[key] = value;
    });

    return this;
  }

  public toFB() {
    const task = { ...(this as ITask) };
    task.createdAt = task.createdAt.toJSON();
    task.completedAt = task.completedAt ? task.completedAt.toJSON() : null;

    return task;
  }

  public toJS() {
    this.createdAt = moment(this.createdAt);
    this.completedAt = moment(this.completedAt);

    return this;
  }

  public toggleComplete() {
    this.completed = !this.completed;
    this.completedAt = moment();

    return this;
  }
}

export default Task;
