import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authorizationService: AuthorizationService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    if (this.authorizationService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    if (!this.loginForm.valid) {
      return false;
    }

    this.loginService.checkCredentials(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe((response: any) => {
      if (response.data) {
        this.loginService.login(response.data);
      } else if (response.error) {
        alert(response.message);
      }
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
