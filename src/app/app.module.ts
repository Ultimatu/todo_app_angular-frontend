import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { DeleteTaskComponent } from './task/delete-task/delete-task.component';
import { UserService } from './authLogin/user.service';
import { TaskService } from './task/service/task.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { UserprofileComponent } from './task/userprofile/userprofile.component';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import  {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';

import { TaskGuard } from './authLogin/TaskGuard';
//mat select
import {MatSelectModule} from '@angular/material/select';
//mat datepicker
import {MatDatepickerModule} from '@angular/material/datepicker';
//mat option
import {MatOptionModule} from '@angular/material/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { PasswordRecoveryComponent } from './user/password-recovery/password-recovery.component';
import { DeleteDialogComponent } from './task/delete-task/delete-dialog/delete-dialog.component';
import { SaveTaskComponent } from './task/task-list/save-task/save-task.component';
import { StartTaskComponent } from './task/task-list/start-task/start-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TaskListComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    UserComponent,
    TaskComponent,
    UserprofileComponent,
    PasswordRecoveryComponent,
    DeleteDialogComponent,
    SaveTaskComponent,
    StartTaskComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatStepperModule,
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatOptionModule,
    TranslateModule.forRoot(),
    MatDialogModule,
    MatSlideToggleModule




  ],
  providers: [UserService, TaskService, TaskGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
