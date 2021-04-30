import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {User} from './user';
import {UserService} from './user.service';
import {FileService} from "./file.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UserService, FileService, AuthService],
})
export class UsersComponent implements OnInit {
  users: User[];
  createUser = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    avatar: new FormControl()
  });
  imageBase64: string;
  errorMessage: string;

  constructor(private userService: UserService,
              private fileService: FileService,
              public authService: AuthService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(response => this.users = response.data.users);
  }

  add(user: User): void {
    if (user.email == null) {
      this.errorMessage = "Email is empty";
    } else if (user.password == null) {
      this.errorMessage = "Password is empty";
    } else if (user.role == null) {
      this.errorMessage = "Role is empty";
    } else {
      user.avatar = this.imageBase64;
      user.password = btoa(user.password);
      this.userService
        .createUser(user)
        .subscribe(user => this.users.push(user),
          () => this.errorMessage = "Invalid data");
    }
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService
      .deleteUser(user.id)
      .subscribe();
  }

  onCreate() {
    this.add(this.createUser.value)
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files[0];

    if (file) {
      this.fileService.base64(file).subscribe(result => this.imageBase64 = result);
    }
  }

}
