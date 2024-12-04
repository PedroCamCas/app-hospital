import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-format-doctor',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  template: `
    <div class="container-form">
      <h2 mat-dialog-title>Doctor</h2>
      <div mat-dialog-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="registerForm">
          <mat-form-field>
            <mat-label>Nombre</mat-label>
            <input matInput formControlName="name" required />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Especialidad</mat-label>
            <input matInput formControlName="specialty" required />
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Aceptar</button>
        </form>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="close()">Cancelar</button>
      </div>
    </div>
  `,
  styleUrls: ['format-doctor.component.css']
})
export class FormatDoctorComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<ModalComponent>,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, specialty } = this.registerForm.value;
      this.doctorService.createDoctor({ name, specialty }).subscribe({
        next: (response) => {
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error) => {
          this.snackBar.open('Error al crear registro, error: '+error, 'Cerrar', {
            duration: 5000,
          });
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
