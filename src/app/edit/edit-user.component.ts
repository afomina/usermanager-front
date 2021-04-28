import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {FileService} from "../user/file.service";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  providers: [UserService, FileService],
})
export class EditUserComponent implements OnInit {
  user: User;
  editUserForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    avatar: new FormControl()
  });
  imageBase64: string;

  constructor(private userService: UserService,
              private fileService: FileService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.userService.getUser(params.get('id')))).subscribe(
          r => (this.user = r.data.user));
  }

  edit(user: User) {
    user.avatar = this.imageBase64;
    user.password = btoa(user.password);
    this.userService.updateUser(this.user.id, user).subscribe();
  }

  update() {
    console.warn(this.editUserForm.value);
    this.edit(this.editUserForm.value);
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files[0];

    if (file) {
      this.fileService.base64(file).subscribe(result => {
        this.imageBase64 = result;
        console.warn(this.imageBase64);
      });
    }
  }
}
