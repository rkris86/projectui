import {Project} from './project';
import {User} from './user';

export class Task {
  public project: Project;
  public task: string;
  public priority: number;
  public parentTask: Task;
  public startDate: string;
  public endDate: string;
  public user: User;
}
