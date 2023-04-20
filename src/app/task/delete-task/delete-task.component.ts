import { Component } from '@angular/core';
import { Task } from '../service/task';
import { TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/authLogin/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TaskListComponent } from '../task-list/task-list.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  submitted = false;
  task: Task;
  task_id: number;
  user_id: number;
  deletedSuccessfully = false;

  constructor( private taskService: TaskService, private route: ActivatedRoute,
     private router: Router, private userService: UserService, public dialog: MatDialog) {
    this.task = new Task();
    this.task.user = this.userService.getUserId();
    this.task_id = this.route.snapshot.params['id'];
    this.user_id = this.userService.getUserId();
  }


   ngOnInit(): void {
    this.task_id = this.route.snapshot.params['id'];
    if (!this.task_id) {
      // Si l'identifiant de tâche n'est pas défini dans l'URL, refuse l'accès
      console.error('Identifiant de tâche invalide.');
      this.router.navigate(['/tasks']);
      return;
    }
    this.taskService.findById(this.task_id).subscribe((data) => {
      console.log(data)
      this.task = data;
    },(error) => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.taskService.deleteTask(this.task_id)
      .subscribe(data => {
        console.log(data);
        this.deletedSuccessfully = true;
        this.gotoList()
        this.openDialog();
        //goto list after 5 seconds
        
        console.log("deleted");
      }, error => console.log(error));
  }
  deleteConfirmed():void{
    this.onSubmit();

  }

  gotoList() {
    this.taskService.goToTaskList();
  }

  openDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '350px',
    });
  }
}
