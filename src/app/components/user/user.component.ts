import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  registerForm: FormGroup;
  userData = 0;
  imageError: string = environment.errorImage;
  imageWarning: string = environment.warningImage;
  imageSuccess: string = environment.successImage;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: AuthService,
    private dialog: MatDialog

  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.loadData()
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const editUser = this.registerForm.value;
      editUser.id = this.userData;
      this.userService.userUpdate(editUser).subscribe({
        next: (response) => {
          this.openModal("Usuario actualizado con exito.", "Descripción: " + response.message, this.imageSuccess);
        },
        error: (err) => {
          this.openModal("Error al actualizar los datos", "Descripción: " + err.message, this.imageError);
        }
      });
    }
  }

  loadData() {
    const email = localStorage.getItem("email");
    if (email) {
      this.userService.getUser(email).subscribe({
        next: (data) => {
          this.userData = data.user.id
          this.registerForm = this.fb.group({
            name: [data.user.name, [Validators.required]],
            email: [data.user.email, [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
          });
        },
        error: (err) => {
          console.error('Error al cargar los datos:', err);
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
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