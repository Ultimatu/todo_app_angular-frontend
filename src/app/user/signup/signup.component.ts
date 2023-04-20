import { Component } from '@angular/core';
import { User } from '../../authLogin/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../authLogin/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {


  errorMessage: string | undefined;
  successMessage: string | undefined;
  nameCtrl: string | undefined;
  surnameCtrl: string | undefined;
  emailCtrl: string | undefined;
  phoneCtrl: string | undefined;
  passwordCtrl: string | undefined;
  confirmPasswordCtrl: string | undefined;
  email: string | undefined;
  password: string | undefined;
  user: User;
  users: User [] = [];
  firstFormGroup = this._formBuilder.group({
   nameCtrl: ['', Validators.required,
   //error message
  ],
    surnameCtrl: ['', Validators.required,
  ]});
  secondFormGroup = this._formBuilder.group({
    emailCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    passwordCtrl: ['', Validators.required],
    confirmPasswordCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService, private _formBuilder: FormBuilder
  ) {
    this.user = new User();
  }
  getErrorMessageName() {
    if (this.firstFormGroup.controls.nameCtrl.hasError('required')) {
      return 'Le nom est requis';
    }
    return '';
  }
  getErrorMessageSurname() {
    if (this.firstFormGroup.controls.surnameCtrl.hasError('required')) {
      return 'Le nom est requis';
    }
    return '';
  }
  getErrorMessageEmail() {
    if (this.secondFormGroup.controls.emailCtrl.hasError('required')) {
      return 'L\'email est requis';
    }
    if (this.secondFormGroup.controls.emailCtrl.hasError('email')) {
      return 'L\'email est invalide';
    }
    return '';
  }
  getErrorMessagePassword() {
    if (this.thirdFormGroup.controls.passwordCtrl.hasError('required')) {
      return 'Le mot de passe est requis';
    }
    if (this.thirdFormGroup.controls.passwordCtrl.hasError('minlength')) {
      return 'Le mot de passe doit avoir au moins 8 caractères';
    }
    return '';
  }
  getErrorMessagePhone() {
    if (this.secondFormGroup.controls.phoneCtrl.hasError('required')) {
    return 'Le téléphone est requis';
    }
    if (this.secondFormGroup.controls.phoneCtrl.hasError('pattern')) {
    return 'Le numéro de téléphone n\'est pas valide';
    }
    return '';
  }

  getErrorMessageConfirmPassword() {
    const password = this.thirdFormGroup.controls.passwordCtrl.value;
    const confirmPassword = this.thirdFormGroup.controls.confirmPasswordCtrl.value;
    if (this.thirdFormGroup.controls.confirmPasswordCtrl.hasError('required')) {
    return 'La confirmation du mot de passe est requise';
    }
    if (password !== confirmPassword) {
      return 'Les mots de passe ne correspondent pas';
    }

      return '';
  }



  submitForm(){
    this.onSubmit;
  }

  onSubmit() {
    console.log(this.user);
    //verifier si les donnees sont envoyés
    if (this.user.email.length === 0 || this.user.name.length == 0 || this.user.phone.length == 0){
      this.errorMessage = "Veuillez remplir tout les champs";

    }
    else{
      this.email = this.user.email;
      this.password = this.user.password;

      this.userService.logIn(this.email, this.password).subscribe(

        () => {
          this.errorMessage = "utilisateur existant";
        },
        (error) => {
          this.userService.signUp(this.user).subscribe(
            () => {
              this.successMessage = 'Inscription réussie';
              this.errorMessage = "";
              this.userService.findAll().subscribe((data) => {
                this.users = data;
              }
              );

            },
            (error) => {
              this.successMessage = "";

              switch (error.status) {
                case 400:
                  this.errorMessage = "Erreur 400 : Le nom d'utilisateur existe déjà";
                  break;
                case 500:
                  this.errorMessage = "Erreur 500 : Le serveur est indisponible";
                  break;
                case 409:
                  this.errorMessage = "Erreur 409 : Le nom d'utilisateur existe déjà";
                  break;
                case 404:
                  this.errorMessage = "Erreur 404 : Le serveur est indisponible";
                  break;
                case 403:
                  this.errorMessage = "Erreur 403 : Le serveur est indisponible";
                  break;
                case 401:

                this.errorMessage = "Erreur 401 : Le serveur est indisponible";
                  break;
                case 0:
                  this.errorMessage = "Erreur 0 : Le serveur est indisponible";
                  break;


                default:
                  this.errorMessage = "Erreur inconnue";
                  break;
              }

            }
           );


        }
      );


    }



  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

}
