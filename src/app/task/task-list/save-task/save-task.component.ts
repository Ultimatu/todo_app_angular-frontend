import { Component } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/authLogin/user.service';
import { Task } from '../../service/task';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent {
  submitted = false;
  task: Task;
  task_id: number;
  user_id: number;
  saveSuccessfully = false;

  constructor( private taskService: TaskService, private route: ActivatedRoute,
     private router: Router, private userService: UserService) {
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
    this.task.progress = "Completed"
    this.taskService.updateTask(this.task)
      .subscribe(data => {
        console.log(data);
        this.saveSuccessfully = true;

        //goto list after 5 seconds
        setTimeout(() => {
          this.taskService.goToTaskList();
        }, 5000);

      }, error => console.log(error));
  }
  saveConfirmed():void{
    this.onSubmit();

  }

}
