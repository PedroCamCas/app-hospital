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
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-edit-format-patient',
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
            <mat-label>Edad</mat-label>
            <input matInput formControlName="age" type="number" required />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Diagnostico</mat-label>
            <input matInput formControlName="diagnosis" required />
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Aceptar</button>
        </form>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="close()">Cancelar</button>
      </div>
    </div>
  `,
  styleUrls: ['../format-doctor/format-doctor.component.css']
})
export class EditFormatPatientComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<ModalComponent>,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      name: [localStorage.getItem("patientName"), [Validators.required]],
      age: [localStorage.getItem("patientAge")],
      diagnosis: [localStorage.getItem("patientDiagnosis"), [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const patient = this.registerForm.value;
      const id = localStorage.getItem("patientId") || "";
      patient.id = parseInt(id, 10);
      localStorage.removeItem("patientId")
      localStorage.removeItem("patientName")
      localStorage.removeItem("patientAge")
      localStorage.removeItem("patientDiagnosis")
      this.patientService.updatePatient(patient).subscribe({
        next: (response) => {
          this.snackBar.open('El registro se ha modificado', 'Cerrar', {
            duration: 5000,
          });
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error) => {
          this.snackBar.open('Error al editar registro, error: '+error, 'Cerrar', {
            duration: 5000,
          });
          this.dialogRef.close();
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
