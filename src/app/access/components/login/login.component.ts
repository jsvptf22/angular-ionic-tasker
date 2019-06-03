import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

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
    let email = 'admin@test.com';
    let password = 'toptal';
    this.loginService.checkCredentials(this.email, this.password).subscribe((response: any) => {
      if (response.data) {
        this.loginService.login(response.data);
      } else if (response.error) {
        alert(response.message);
      }
    });
  }
}
