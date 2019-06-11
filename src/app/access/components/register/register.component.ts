import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordConfirmation: new FormControl('', Validators.required),
  }, this.checkPasswords);
  checkForm: boolean;

  constructor(
    private authorizationService: AuthorizationService,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkSession();
    this.checkForm = false;
  }

  checkSession() {
    if (this.authorizationService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  register() {
    this.checkForm = true;

    if (!this.registerForm.valid) {
      return false;
    }

    this.registerService.create({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      passwordConfirmation: this.registerForm.value.passwordConfirmation
    }).subscribe((response: any) => {
      if (response.data) {
        alert('usuario creado correctamente');
        this.registerForm.reset();
      } else if (response.error) {
        alert(response.message);
      }
    });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirmation.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirmation() { return this.registerForm.get('passwordConfirmation'); }

}
