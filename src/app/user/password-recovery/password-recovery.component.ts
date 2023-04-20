import { Component } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {
  email: string;
  newPassword: string;
  confirmPassword: string;
  showChangePasswordForm: boolean = false;
  errorMsg: string;

  constructor() {
    this.email = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMsg = '';

  }

  submitForm() {
    // Vérifiez si l'e-mail est valide
    // Si l'e-mail est valide, définissez showChangePasswordForm sur true
    // Sinon, définissez errorMsg sur le message d'erreur approprié
  }

  changePassword() {
    // Changez le mot de passe pour l'utilisateur associé à l'e-mail donné
    // Si la modification du mot de passe est réussie, redirigez l'utilisateur vers la page de connexion
    // Sinon, définissez errorMsg sur le message d'erreur approprié
  }
}

