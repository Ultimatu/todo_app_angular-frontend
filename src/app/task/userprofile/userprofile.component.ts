import { Component } from '@angular/core';
import { UserService } from 'src/app/authLogin/user.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task/service/task.service';
import { User } from 'src/app/authLogin/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',

  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
    title = 'userprofile';
    user: User;
    pictureForm: boolean = false;
    selectedFile: File;
    successMessage: string | undefined;
    errorMessage: string | undefined;
    photoUrl: string | undefined;


    constructor(
      private userService: UserService,
      private router: Router,
      private taskService: TaskService, private http: HttpClient
    ) {
      this.user = userService.getUserData();
      this.errorMessage = "";
      this.successMessage = "";
      this.selectedFile = new File([], "");

    }
    ngOnInit():void {
      console.log("ngOnInit");
      this.user = this.userService.getUserData();
      console.log(this.user);
      this.userService.getUserProfilePic().subscribe(response => {
        console.log(response);
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string?? "./home/tonde/IdeaProjects/frontend/src/assets/images/no_file.png"
          //this home/tonde/.. is for my system tree then put here 


        };
        reader.readAsDataURL(response);
        },
        (error)=>{
          console.log(error);
        }

      )
    }
    onLogout() {
      this.userService.logout();
    }
    onWantToLogout() {
      if (this.router.url.includes('ok')) {
        this.onLogout();
      }
    }
    addProfilePic():void{
      this.pictureForm = true;
    }
    onSubmit() {
      this.userService.uploadProfilePic(this.selectedFile).subscribe(
        (response) => {
          console.log(response);
          this.successMessage = 'Image de profil mise à jour avec succès';
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour de l\'image de profil';
        }
      );
    }

    handleFileInput(event: any) {
      this.selectedFile = event.target.files[0];
    }


}

