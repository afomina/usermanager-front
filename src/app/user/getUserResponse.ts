import {User} from "./user";

export interface getUserResponse {
  data: Data;
}
export interface Data {
  user: User;
}
