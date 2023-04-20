import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../authLogin/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @ViewChild('taskForm') taskForm: any;
  userservice: UserService;
  addTask: boolean = false;
  editTask: boolean = false;
  taskList: boolean = false;
  deleteTask: boolean = false;
  userProfile: boolean = false;
  onlyTask: boolean = false;
  message: string = '';
  userName: string = '';
  userSurname: string = '';

  //id openAddTask
  id_add = document.getElementById('openAddTask');
  //id openEditTask
  id_edit = document.getElementById('openEditTask');
  //id openTaskList
  id_list = document.getElementById('openTaskList');
  //id openDeleteTask
  id_delete = document.getElementById('openDeleteTask');
  //id openUserProfile
  id_profile = document.getElementById('openUserProfile');
  surname: any;
  userFirstname: any;
  //eventList
  //rediger un message dans la page d'accueil


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userservice = userService;
  }
  ngOnInit(): void {
    //get user name from local storage user
    this.surname = this.userService.getSurname();
    this.userFirstname = this.userService.getUserFirstname();
    this.message = 'Welcome ' + this.userFirstname + ' ' + this.surname;
    this.message = this.message + "click on the button to add a task";
    this.onlyTask = true;
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
    this.addTask = true;
    this.editTask = false;
    this.taskList = false;
    this.deleteTask = false;
    this.userProfile = false;
  }


  onEditTaskButtonClick():void {
    this.addTask = false;
    this.editTask = true;
    this.taskList = false;
    this.deleteTask = false;
    this.userProfile = false;
  }
  onTaskListButtonClick():void {
    this.addTask = false;
    this.editTask = false;
    this.taskList = true;
    this.deleteTask = false;
    this.userProfile = false;
  }
  onDeleteTaskButtonClick():void {
    this.addTask = false;
    this.editTask = false;
    this.taskList = false;
    this.deleteTask = true;
    this.userProfile = false;
  }
  onUserProfileButtonClick():void {
    this.addTask = false;
    this.editTask = false;
    this.taskList = false;
    this.deleteTask = false;
    this.userProfile = true;
    this.userService.gotoToUserProfile();
  }

  onLogoutButtonClick():void {
    this.logout();
    this.router.navigate(['/login']);
  }
  //eventListener if idies





}
