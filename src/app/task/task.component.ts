import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../authLogin/user.service';
import { TaskService } from './service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @ViewChild('taskForm') taskForm: any;
  userservice: UserService;

  taskList: boolean = false;
  userProfile: boolean = false;
  onlyTask: boolean = true;
  message: string = '';
  userName: string = '';
  userSurname: string = '';
  //id openAddTask
  id_add = document.getElementById('openAddTask');
  //id openTaskList
  id_list = document.getElementById('openTaskList');
  //id openUserProfile
  id_profile = document.getElementById('openUserProfile');
  surname: any;
  userFirstname: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private taskService: TaskService
  ) {
    this.userservice = userService;
  }
  ngOnInit(): void {
    //get user name from local storage user
    this.surname = this.userService.getSurname();
    this.userFirstname = this.userService.getUserFirstname();
    this.message = 'Welcome ' + this.userFirstname + ' ' + this.surname;
    this.message = this.message;
  }

  logout() {
    if( localStorage.getItem("remember")){
      localStorage.removeItem('user');
      this.userservice.setLoggedIn(false);
      this.userservice.logout();
    }
    else{
      localStorage.removeItem('user');
      this.userservice.setLoggedIn(false);
      this.userservice.onLogout();
    }
  }

  onAddTaskButtonClick() {
    this.message = "";
    this.onlyTask = false;
    this.taskService.goToTaskAdd()
  }



  onTaskListButtonClick():void {
    this.message = ""
    this.onlyTask = false;
    this.taskService.goToTaskList();

  }
  onUserProfileButtonClick():void {
    this.onlyTask = false;
    this.userService.gotoToUserProfile();
  }

  onLogoutButtonClick():void {
    this.logout();
    this.router.navigate(['/login']);
  }
  //eventListener if idies

}
