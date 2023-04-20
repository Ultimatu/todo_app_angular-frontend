import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../authLogin/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit{
  title = 'loading-page';
  message : string | undefined;

  constructor(http : HttpClient, private userService: UserService, private router: Router) {
  }
  //init
  ngOnInit(): void {
    setInterval(()=>{
      //check is server is running
      this.userService.testConnection().subscribe(
        (response) => {
          console.log(response);
          setTimeout(()=>{
            this.userService.isOpen();

          }, 5000)
        },
        (error) => {
          console.log(error);
          this.message = "Veuillez patientez, nous chargons les données"
        }

      );
    }, 1000)
  }


}
