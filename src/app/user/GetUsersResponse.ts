import {User} from "./user";

export interface GetUsersResponse {
  data: Users;
}
export interface Users {
  users: User[];
}
