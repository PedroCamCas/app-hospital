import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule
  ]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: ''
  };

  imageError: string = environment.errorImage;
  imageWarning: string = environment.warningImage;
  imageSuccess: string = environment.successImage;

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {}

  onLoginSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('email', this.loginData.email);
        this.router.navigate(['/doctors']);
      },
      error: (err) => {
        this.openModal("Error al iniciar sesión", "Descripción: "+err.message, this.imageError);
      }
    });
  }

  onRegisterSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.openModal("Registro exitoso", "Inicie sesión con sus credenciales para acceder al sistema.", this.imageSuccess);
      },
      error: (err) => {
        console.error('Error en registro:', err);
        this.openModal("Error en el registro de sus datos", "Descripción: "+err.message, this.imageError);
      }
    });
  }

  openModal(title: string, message: string, imageUrl: string) {
    this.dialog.open(ModalComponent, {
      data: {
        title: title,
        message: message,
        imageUrl: imageUrl,
      },
      width: '50%',
    });
  }

}