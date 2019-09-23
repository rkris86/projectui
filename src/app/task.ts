import {Project} from './project';
import {User} from './user';
import {ParentTask} from './parent-task';

export class Task {
  public project: Project;
  public taskId: number;
  public task: string;
  public priority: number;
  public parentTask: ParentTask;
  public startDate: string;
  public endDate: string;
  public user: User;
  public status: string;
  public parent: boolean;
}
