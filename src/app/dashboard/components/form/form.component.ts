import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SaveEditService } from '../../services/save-edit.service';
import { TasksService } from '../../services/tasks.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() toogleForm = new EventEmitter<boolean>();

  id: number;
  name: string;
  description: string;

  constructor(
    private storage: Storage,
    private saveEditService: SaveEditService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.getActive();

    this.storage.get('session_data').then(data => {
      this.saveEditService.setSessionData(data);
    });
  }

  getActive() {
    this.saveEditService.getActive().subscribe((task: any) => {
      if (task.id) {
        this.id = task.id;
        this.name = task.name;
        this.description = task.description;
      } else {
        this.id = null;
        this.name = null;
        this.description = null;
      }
    });
  }

  save() {
    this.saveEditService
      .save(this.id, this.name, this.description)
      .subscribe((response: any) => {
        if (response.id) {
          if (this.id) {
            this.tasksService.updateTask(this.id, response);
          } else {
            this.tasksService.add(response);
            this.name = this.description = '';
          }
          this.afterSave();
        }
      });
  }

  afterSave() {
    this.saveEditService.setActive({});
    this.toogleForm.emit(true);
  }

  cancel() {
    this.afterSave();
  }
}
