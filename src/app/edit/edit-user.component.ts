import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {FileService} from "../user/file.service";
import {switchMap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  providers: [UserService, FileService, AuthService],
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
  errorMessage: string;

  constructor(private userService: UserService,
              private fileService: FileService,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              public authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.userService.getUser(params.get('id')))).subscribe(
      response => {
            this.user = response.data.user;
            if (this.user.avatar != null) {
              this.userAvatarUrl = this.domSanitizer.bypassSecurityTrustUrl(
                "data:image/png;base64, " + this.user.avatar);
            }
          });
  }

  editUser(userData: User) {
    if (userData.email == null) {
      this.errorMessage = "Email is empty";
    } else if (userData.password == null) {
      this.errorMessage = "Password is empty";
    } else if (userData.role == null) {
      this.errorMessage = "Role is empty";
    } else {
      if (this.uploadedImageBase64 == null) {
        userData.avatar = this.user.avatar;
      } else {
        userData.avatar = this.uploadedImageBase64;
      }
      userData.password = btoa(userData.password);
      this.userService.updateUser(this.user.id, userData)
        .subscribe(() => this.router.navigateByUrl('/users'),
          () => this.errorMessage = "Invalid data");
    }
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

  deleteAvatar() {
    this.user.avatar = null;
    this.userAvatarUrl= null;
  }
}
