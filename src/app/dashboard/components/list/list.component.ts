import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AlertController } from '@ionic/angular';
import { SaveEditService } from '../../services/save-edit.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit,OnDestroy {
  @Output() toogleForm = new EventEmitter<boolean>();
  list: object[];

  constructor(
    private saveEditService: SaveEditService,
    private alertController: AlertController,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.getList();
  }

  ngOnDestroy(){
    this.tasksService.destroyList();
  }

  getList() {
    this.tasksService.getList().subscribe(tasks => {
      this.list = tasks
    });
  }

  editTask(taskId){
    const task = this.list.find((t: any) => t.id === taskId);
    this.saveEditService.setActive(task);
    this.toogleForm.emit(true);
  }

  deleteTask(taskId){
    this.tasksService.deleteTask(taskId);
  }

  async presentAlertConfirm(taskId) {
    const alert = await this.alertController.create({
      header: 'Eliminando!',
      message: 'Esta seguro de eliminar la tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Eliminar',
          cssClass: 'primary',
          handler: () => {
            this.deleteTask(taskId);
          }
        }
      ]
    });

    await alert.present();
  }
}
