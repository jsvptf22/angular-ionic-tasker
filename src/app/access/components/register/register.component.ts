import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

  constructor(
    private authorizationService: AuthorizationService,
    private registerService: RegisterService,
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

  register() {
    let data = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }

    this.registerService.create(data).subscribe((response: any) => {
      if (response.data) {
        alert("usuario creado correctamente");
        this.name = '';
        this.email = '';
        this.password = '';
        this.password_confirmation = '';
      } else if (response.error) {
        alert(response.message);
      }
    })
  }

}
