import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatIconModule, MatTableModule],
  template: `
  <h2>Paciente <strong>{{data.name}}</strong></h2>
  <h3>Asigne un doctor para el paciente:</h3>
  <table mat-table [dataSource]="doctors" class="mat-elevation-z8">
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Nombre </th>
    <td mat-cell *matCellDef="let doctor">{{ doctor.name }}</td>
  </ng-container>

  <ng-container matColumnDef="specialty">
    <th mat-header-cell *matHeaderCellDef> Especialidad </th>
    <td mat-cell *matCellDef="let doctor">{{ doctor.specialty }}</td>
  </ng-container>

  <ng-container matColumnDef="assign">
    <th mat-header-cell *matHeaderCellDef> Asignar </th>
    <td mat-cell *matCellDef="let doctor">
      <button mat-button (click)="assignDoctor(doctor)"><mat-icon>done_outline</mat-icon></button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
  `,
  styles: [`
    .modal-container {
      text-align: center;
      padding: 16px;
    }
    button {
      margin-top: 16px;
    }
  `]
})
export class AssingDoctorComponent {
  doctors: any[] = [];
  displayedColumns: string[] = ['name', 'specialty', 'assign']; 

  constructor(
    public dialogRef: MatDialogRef<AssingDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: number },
    private doctorService: DoctorService,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data.doctors;
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
      },
    });
  }

  assignDoctor(record: any){
    this.patientService.assingDoctor(record, this.data.id).subscribe({
      next: (data) => {
        this.snackBar.open('Doctor asignado con éxito', 'Aceptar', {
          duration: 5000,
        });
        window.location.reload();
      },
      error: (err) => {
        this.snackBar.open('Error al asignar doctor al paciente: '+err, 'Aceptar', {
          duration: 5000,
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
