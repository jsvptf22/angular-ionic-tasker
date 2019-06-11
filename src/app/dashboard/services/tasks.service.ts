import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  serverUrl = environment.serverRoute;

  list: any;
  tasks: any = [];

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.list = new BehaviorSubject([]);
  }

  destroyList() {
    this.tasks = [];
    this.setList(this.tasks);
  }

  findTasks() {
    this.storage.get('session_data').then(session_data => {
      this.http.get(`${this.serverUrl}/usertasks/${session_data.id}`, {
        responseType: 'json',
        params: {
          api_token: session_data.api_token
        }
      }).subscribe((response: []) => {
        this.tasks = response;
        this.setList(this.tasks);
      });
    });
  }

  updateTask(taskId, task) {
    let index = this.tasks.findIndex(t => t.id === taskId);
    this.tasks[index] = task;
    this.setList(this.tasks);
  }

  deleteTask(taskId) {
    this.storage.get('session_data').then(session_data => {
      this.http.request('POST', `${this.serverUrl}/tasks/${taskId}`, {
        responseType: 'json',
        params: {
          _method: 'DELETE',
          api_token: session_data.api_token
        }
      }).subscribe((response: []) => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.setList(this.tasks);
      });
    });
  }

  add(task: object) {
    this.tasks.unshift(task);
    this.setList(this.tasks);
  }

  setList(list: object[]) {
    this.list.next(list);
  }

  getList(): Observable<object[]> {
    this.findTasks();
    return this.list.asObservable();
  }
}
