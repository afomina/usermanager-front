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
  imageBase64: string;
  uploadedImage: SafeUrl;
  userAvatar: SafeUrl;

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
              this.userAvatar = this.domSanitizer.bypassSecurityTrustUrl(
                "data:image/png;base64, " + this.user.avatar);
            }
          });
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
        this.uploadedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + this.imageBase64);
        console.warn(this.uploadedImage);
      });
    }
  }
}
