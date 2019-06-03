import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['access', 'login']);
      return false;
    }

    return true;
  }

  login(data) {
    this.storage.set('api_token', data.api_token).then(x => {
      this.storage.set('session_data', data);
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.storage.remove('api_token').then(x => {
      this.authenticationState.next(false);
      this.storage.clear();
    });
  }

  isAuthenticated() {
    return this.storage.get('api_token') && this.authenticationState.value;
  }

  checkToken() {
    this.storage.get('api_token').then(x => {
      if (x) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }
}
