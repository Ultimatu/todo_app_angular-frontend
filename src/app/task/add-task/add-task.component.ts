import { Component } from '@angular/core';
import { Task } from '../service/task';
import { TaskService } from '../service/task.service';
import { UserService } from 'src/app/authLogin/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  newTask: Task;

  constructor(private taskService: TaskService, private userService: UserService) {
    this.newTask = new Task()
    this.newTask.user  = userService.getUserId()

  }
  ngOnInit():void{
    this.newTask.user = this.userService.getUserId();
  }

  onSubmit() {
    const userId = this.userService.getUserId(); // récupère l'ID utilisateur
    this.newTask.user = { id: userId }; // ajoute l'ID utilisateur à la nouvelle tâche
    console.log(this.newTask);
    this.taskService.addTask(this.newTask).subscribe(
      (data) => {
        // Le code à exécuter en cas de succès lors de la création de la tâche
        console.log(data);
        this.taskService.loadTasks(userId);
        this.taskService.goToTaskList();
      },
      (error) => {
        // Le code à exécuter en cas d'erreur lors de la création de la tâche
        switch (error.status) {
          case 400:
            console.log('Bad request');
            break;
          case 401:
            console.log('Unauthorized');
            break;
          case 403:
            console.log('Forbidden');
            break;
          case 404:
            console.log('Not found');
            break;
          case 500:
            console.log('Internal server error');
            break;
          default:
            console.log('Unknown error');
        }

      }
    );
  }
}
