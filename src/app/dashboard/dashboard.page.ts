import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: object;
  constructor(
    private authorizationService: AuthorizationService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  logout() {
    this.authorizationService.logout();
  }

  getUserData() {
    this.storage.get('session_data').then(data => {
      this.user = data.name;
    })
  }
}
