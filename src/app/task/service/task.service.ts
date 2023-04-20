import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/authLogin/user.service';

export interface Task {
  id: number;
  user: any;
  title: string;
  description: string;
  createDate: string;
  progress: string;
  priority: string;
  deadLine: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly BASE_URL = 'http://localhost:8080/api/v1';
  private readonly TASKS_URL = `${this.BASE_URL}/tasks`;
  private readonly TASKS_BY_USER_ID_URL = `${this.TASKS_URL}/user`;

  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private taskid$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}


  public getTasks$(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  public loadTasks(userId: number):void {
    this.http.get<Task[]>(`${this.TASKS_BY_USER_ID_URL}/${userId}`).pipe(
      tap(tasks => this.tasks$.next(tasks)),
      catchError(this.handleError)
    ).subscribe();
  }
  public loadTasksByid(id: number):void {
    this.http.get<Task[]>(`${this.TASKS_URL}/${id}`).pipe(
      tap(tasks => this.taskid$.next(tasks)),
      catchError(this.handleError)
    ).subscribe();
  }
  //find task by id
  public getById(): Observable<Task[]> {
    return this.taskid$.asObservable()
  }
  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.TASKS_URL}/save/${task.user.id}`, task).pipe(
      tap(task => this.tasks$.next([...this.tasks$.value, task])),
      catchError(this.handleError)
    );
  }
  public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.TASKS_URL}/${task.id}`, task).pipe(
      tap(task => {
        const tasks = this.tasks$.value.map(t => t.id === task.id ? task : t);
        this.tasks$.next(tasks);
      }),
      catchError(this.handleError)
    );
  }

  public deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.TASKS_URL}/${taskId}`).pipe(
      tap(() => {
        const tasks = this.tasks$.value.filter(task => task.id !== taskId);
        this.tasks$.next(tasks);
      }),
      catchError(this.handleError)
    );
  }
  //find task by id
  public findById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.TASKS_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Erreur ${error.status} : ${error.error}`;
    }
    return throwError(errorMessage);
  }

  public goToTaskList(): void {
    this.router.navigate(['/task_list']);
  }

  public goToTaskAdd(): void {

    this.router.navigate(['/add_task']);
  }

  public goToTaskEdit(id: number): void {
    this.router.navigate([`/edit_task/${id}`]);
  }
  public goToDeleteTask(id: number): void {
    this.router.navigate([`/delete_task/${id}`]);
  }
  public goToSaveTask(id: number):void{
    this.router.navigate([`/save_task/${id}`])
  }
  public goToStartTask(id: number):void{
    this.router.navigate([`/start_task/${id}`])
  }

}
