import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class ServerIsOPen implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userService.isOpen()) {
      this.router.navigate(['/loading_datas']);
      return false;
    }
    return true;
  }
}
