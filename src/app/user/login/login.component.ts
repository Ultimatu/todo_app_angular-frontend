import { Component } from '@angular/core';
import { User } from '../../authLogin/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../authLogin/user.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | undefined;
  successMessage: string | undefined;
  userForm: NgForm | undefined;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false)
  });

  user: User;
  users: User [] = [];
  hide = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService, private formBuilder: FormBuilder
  ) {
    this.user = new User();
  }


  rememberMeChanged() {
    if (this.user.rememberMe) {
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('password', this.user.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Récupérez l'adresse e-mail et le mot de passe de localStorage
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    // Si les données existent, remplissez les champs de connexion
    if (email && password) {
      this.loginForm.setValue({email: email, password: password, rememberMe: true});
      this.user.email = email;
      this.user.password = password;
      this.user.rememberMe = true;
    }
  }


  onSubmit() {
    // Si l'utilisateur a coché la case "Se souvenir de moi", stockez l'adresse e-mail et le mot de passe dans le localStorage
    if (this.user.rememberMe) {
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('password', this.user.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }

    this.userService.logIn(this.user.email, this.user.password).subscribe(
      (succes) => {
        this.successMessage = 'Connexion réussie';
        this.errorMessage = '';
        //stocker les données de l'utilisateur dans le local storage
        //setLoggedin
        localStorage.setItem('user', JSON.stringify(succes));
        this.userService.setLoggedIn(true);
        localStorage.setItem('isLoggedin', 'true');
        this.userService.gotoTaskHome();
        //autorisation pour aller sur la page de tache
      },
      (error) => {
        this.successMessage = '';
        // Gestion des erreurs
        if (error.status === 400) {
          this.errorMessage = 'Données incorrectes';
        } else if (error.status === 401) {
          this.errorMessage = 'Non autorisé';
        } else if (error.status === 404) {
          this.errorMessage = 'Ressource introuvable';
        } else if (error.status === 500) {
          this.errorMessage = 'Erreur serveur';
        } else {
          this.errorMessage = 'Erreur inattendue';
        }
      }
    );
  }
  passRecovery():void{
    this.router.navigate(["/password_recovery"]);

  }


}
