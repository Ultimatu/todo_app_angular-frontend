import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task.component';
import { TaskService } from '../../service/task.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
  animations: [
    trigger('dialogSlide', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)' }),        animate('300ms ease-out', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class DeleteDialogComponent {
  constructor(public dialgoRef: MatDialogRef<DeleteTaskComponent>, private taskservice: TaskService){

  }
  onClose(){
    this.taskservice.goToTaskList();
  }
}
