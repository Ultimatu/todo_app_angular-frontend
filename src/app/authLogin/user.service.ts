import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { Observable, map } from 'rxjs';
import { Task } from '../task/service/task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:8080/api/v1';
  private readonly SIGN_UP_URL = `${this.API_URL}/signup`;
  private readonly SIGN_IN_URL = `${this.API_URL}/login`;
  private readonly USERS_URL = `${this.API_URL}/users`;
  private readonly USER_BY_EMAIL_URL = `${this.API_URL}/email`;
  private readonly USER_PROFILE_PIC_URL = `${this.API_URL}/user/profile_pic`;
  private readonly FOUND_USER_URL = `${this.API_URL}/found_user`;
  private user_data: User = new User();
  private userId: number = 0;
  private loggedIn: boolean = false;
  private isopen: boolean = false;


  constructor(private http: HttpClient, private router: Router) {

  }
  //test server connection
  public testConnection(): Observable<any> {
    return this.http.get(`${this.API_URL}/sayhello`);
  }
  public isOpen(){
    return this.isopen
  }
  public setIsOpen(isOpen :boolean){
    this.isopen = isOpen;
    this.gotoUserLogin()
  }
  public isLoggedIn() {
    return this.loggedIn;
  }
  public setLoggedIn(loggedIn: boolean) {
    this.user_data = JSON.parse(localStorage.getItem('user') || '{}');
    this.loggedIn = loggedIn;
    this.userId = this.user_data.id
  }
  //getUsername
  public getSurname() {
    this.user_data = JSON.parse(localStorage.getItem('user') || '{}');
    return this.user_data.surname;
  }
  //getuserfistname
  public getUserFirstname() {
    this.user_data = JSON.parse(localStorage.getItem('user') || '{}');
    return this.user_data.name;
  }
  //set loggedOut
  public setLoggedOut(loggedOut: boolean) {
    this.loggedIn = loggedOut;
  }
  //get user data
  public getUserData() {
    return this.user_data;
  }
  public getUserId() {
    return this.userId;
  }

  //find All users
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.USERS_URL);
  }

  //find user by id
  public findDataById(id: number): Observable<User> {
    return this.http.get<User>(`${this.FOUND_USER_URL}/${id}`);
  }

  //find user by email
  public findAllByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.USER_BY_EMAIL_URL}/${email}`);
  }

  //update user
  public signUp(user: User): Observable<User> {
    return this.http.post<User>(this.SIGN_UP_URL, user);
  }

  //login
  public logIn(email: string, password: string): Observable<User> {
    const body = {
      email: email,
      password: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http.post<User>(this.SIGN_IN_URL, body, options)
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            this.setLoggedIn(true);
          }
          return user;
        })
      );
  }

  //delete user
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.USERS_URL}/${id}`);
  }

  public uploadProfilePic(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.USER_PROFILE_PIC_URL}/${this.userId}`, formData);
  }
  //get user profile pic
  public getUserProfilePic(): Observable<Blob> {
    return this.http.get(`${this.USER_PROFILE_PIC_URL}/${this.userId}`, { responseType: 'blob' })
  }

  //logout
  public logout() {
    if (this.loggedIn == false) {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
    }
  }

  //goto task home
  public gotoTaskHome():void {
    this.router.navigate(['/tasks']);
  }
  onLogout():void {
    this.logout();
    this.gotoUserLogin();
  }


  gotoTaskList():void {
    this.router.navigate(['/task_list']);
  }

  gotoUserList():void {
    this.router.navigate(['/users']);
  }
  gotoUserHome():void {
    this.router.navigate(['/userslist']);
  }
  gotoUserLogin():void {
    this.router.navigate(['/login']);
  }
  gotoUserRegister():void {
    this.router.navigate(['/signup']);
  }
  gotoUserLogout():void {
    this.router.navigate(['/logout']);
  }
  gotoToUserProfile():void{
    this.router.navigate(['/userprofile']);
  }
}
