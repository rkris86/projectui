import {User} from './user';

export class Project {
  public projectId: number;
  public project: string;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public user: User;
}
