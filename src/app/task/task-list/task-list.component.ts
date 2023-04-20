import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { UserService } from 'src/app/authLogin/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

interface Task {
  id: number;
  user: number;
  title: string;
  description: string;
  createDate: string;
  progress: string;
  priority: string;
  deadLine: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  isEmpty: boolean = false;

  constructor(private taskService: TaskService,
    private userService: UserService, public dialog: MatDialog
    ) {
      this.tasks = [];
      this.isEmpty = false;
    }

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    this.taskService.loadTasks(userId);
    this.taskService.getTasks$().subscribe(
      (tasks) => this.tasks = tasks);

    setTimeout(() => {

      if(this.tasks.length == 0){
        this.isEmpty = true;
      }
    }, 3000);


  }

  onDelete(id: number):void{
    this.taskService.goToDeleteTask(id);
  }

  onEdit(id: number):void{
    //goto edit page
    this.taskService.goToTaskEdit(id);

  }


  addTask():void{
    this.taskService.goToTaskAdd();
  }
  onSave(id: number):void{
    this.taskService.goToSaveTask(id);
  }
  onStart(id:number):void{
    this.taskService.goToStartTask(id);
  }
}
