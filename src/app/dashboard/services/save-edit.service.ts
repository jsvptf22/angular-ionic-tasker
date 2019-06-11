import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveEditService {
  serverUrl = environment.serverRoute;
  session_data: any;
  activeTask: any;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.activeTask = new BehaviorSubject({});
  }

  setSessionData(data){
    this.session_data = data;
  }

  setActive(task) {
    this.activeTask.next(task);
  }

  getActive(): Observable<object[]> {
    return this.activeTask.asObservable();
  }

  save(id, name, description) {
    if (id) {
      return this.update(id, name, description);
    } else {
      return this.create(name, description);
    }
  }

  create(name, description) {
    return this.http.request('POST', this.serverUrl + '/tasks', {
      responseType: 'json',
      params: {
        name: name,
        description: description,
        userId: this.session_data.id,
        api_token: this.session_data.api_token
      }
    })
  }

  update(id, name, description) {
    return this.http.request('POST', `${this.serverUrl}/tasks/${id}`, {
      responseType: 'json',
      params: {
        _method: 'PUT',
        name: name,
        description: description,
        userId: this.session_data.id,
        api_token: this.session_data.api_token
      }
    })
  }
}
