import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  taskForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  checkForm: boolean;

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
        this.taskForm.controls.id.setValue(task.id);
        this.taskForm.controls.name.setValue(task.name);
        this.taskForm.controls.description.setValue(task.description);
      } else {
        this.taskForm.reset();
      }
    });
  }

  save() {
    this.checkForm = true;

    if (!this.taskForm.valid) {
      return false;
    }

    this.saveEditService
      .save(
        this.taskForm.value.id,
        this.taskForm.value.name,
        this.taskForm.value.description
      )
      .subscribe((response: any) => {
        if (response.id) {
          if (this.taskForm.value.id) {
            this.tasksService.updateTask(this.taskForm.value.id, response);
          } else {
            this.tasksService.add(response);
            this.taskForm.reset();
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

  get id() { return this.taskForm.get('id'); }
  get name() { return this.taskForm.get('name'); }
  get description() { return this.taskForm.get('description'); }
}
