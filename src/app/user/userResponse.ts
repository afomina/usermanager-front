import {User} from "./user";

export interface UserResponse {
  data: Data;
}
export interface Data {
  user: User;
}
