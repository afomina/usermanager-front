import {FormControl, FormGroup} from "@angular/forms";
import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  providers: [AuthService],
})
export class AuthComponent {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {}

  onLogin() {
    this.authService.login(this.loginForm.value, () => {
      if (this.authService.isAdmin()) {
        this.router.navigateByUrl('/users');
      } else {
        this.errorMessage = "Access denied";
      }
    }, () => this.errorMessage = "Invalid email or password");
  }
}
