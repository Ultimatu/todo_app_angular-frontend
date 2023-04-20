import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import {UserComponent} from "./user/user.component";
import { UserService } from './authLogin/user.service';
import { TaskComponent } from './task/task.component';
import { UserprofileComponent } from './task/userprofile/userprofile.component';
import { TaskGuard } from './authLogin/TaskGuard';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { DeleteTaskComponent } from './task/delete-task/delete-task.component';
import { AlreadyAuthGuard } from './authLogin/AlreadyAuthGuard';
import { TaskListComponent } from './task/task-list/task-list.component';
import { PasswordRecoveryComponent } from './user/password-recovery/password-recovery.component';
import { DeleteDialogComponent } from './task/delete-task/delete-dialog/delete-dialog.component';
import { SaveTaskComponent } from './task/task-list/save-task/save-task.component';
import { StartTaskComponent } from './task/task-list/start-task/start-task.component';
import { ServerIsOPen } from './authLogin/ServerIsOpen';
import { LoadingPageComponent } from './loading-page/loading-page.component';


const routes: Routes = [
  //default path
  { path: '', redirectTo: '/loading_datas', pathMatch: 'full',
  },
  {path: 'loading_datas', component: LoadingPageComponent
  },
  { path: 'login', component: UserComponent, canActivate: [ServerIsOPen],
    children:[{
    path:'', component: LoginComponent}]
  },
  { path: 'signup', component: UserComponent,
    children:[{
      path:'', component: SignupComponent}]
  },
  { path: 'tasks', component: TaskComponent, canActivate: [TaskGuard]},
  { path: 'userprofile', component: TaskComponent, canActivate: [TaskGuard],
    children:[{ path:'', component: UserprofileComponent}]
  },
  { path: 'add_task', component: TaskComponent, canActivate: [TaskGuard],
    children:[{ path:'', component: AddTaskComponent}]
  },
  { path: 'task_list', component: TaskComponent, canActivate: [TaskGuard],
    children:[{ path:'', component: TaskListComponent}]
  },
  { path: 'edit_task/:id', component: TaskComponent, canActivate: [TaskGuard],
    children:[{ path:'', component: EditTaskComponent}]
  },
  //delete task
  { path: 'delete_task/:id', component: TaskComponent, canActivate: [TaskGuard],
    children:[{ path:'', component: DeleteTaskComponent}]
  },
  { path: 'password_recovery', component: UserComponent,
    children:[{ path:'', component: PasswordRecoveryComponent}]
  },

  { path: 'save_task/:id', component: TaskComponent, canActivate : [TaskGuard],
    children:[{ path:'', component: SaveTaskComponent}]
  },
  { path: 'start_task/:id', component: TaskComponent, canActivate : [TaskGuard],
    children:[{ path:'', component: StartTaskComponent}]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
