import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {FileService} from "../user/file.service";
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
  uploadedImageBase64: string;
  uploadedImageUrl: SafeUrl;
  userAvatarUrl: SafeUrl;

  constructor(private userService: UserService,
              private fileService: FileService,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.userService.getUser(params.get('id')))).subscribe(
          r => {
            this.user = r.data.user;
            if (this.user.avatar != null) {
              this.userAvatarUrl = this.domSanitizer.bypassSecurityTrustUrl(
                "data:image/png;base64, " + this.user.avatar);
            }
          });
  }

  editUser(userData: User) {
    if (this.uploadedImageBase64 == null) {
      userData.avatar = this.user.avatar
    } else {
      userData.avatar = this.uploadedImageBase64;
    }
    if (userData.password != null) {
      userData.password = btoa(userData.password);
    }
    this.userService.updateUser(this.user.id, userData).subscribe();
  }

  update() {
    this.editUser(this.editUserForm.value);
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files[0];

    if (file) {
      this.fileService.base64(file).subscribe(result => {
        this.uploadedImageBase64 = result;
        this.uploadedImageUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + this.uploadedImageBase64);
      });
    }
  }
}
