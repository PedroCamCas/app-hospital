import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-modal',
  imports:[CommonModule],
  template: `
    <div class="modal-container">
      <h2 mat-dialog-title>{{ data.name }} - {{ data.specialty }} </h2>
      <p><strong>Pacientes asignados: </strong></p>
      <ng-container *ngIf="patients.length > 0; else noPatients">
        <p *ngFor="let patient of patients">{{ patient.name }}</p>
      </ng-container>
      <ng-template #noPatients>
        <p>No se encontraron pacientes asignados.</p>
      </ng-template>
      <button mat-button (click)="close()">Cerrar</button>
    </div>
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
export class DetailDoctorComponent {
  patients: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DetailDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; specialty: string; id: number },
    private doctorService: DoctorService,
  ) {}

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.doctorService.getDoctor(this.data.id).subscribe({
      next: (data) => {
        this.patients = data.doctorWithPatients.patients;
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
