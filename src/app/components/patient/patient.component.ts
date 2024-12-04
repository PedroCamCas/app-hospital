import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PatientService } from '../../services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { FormatPatientComponent } from '../../shared/format-patient/format-patient.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditFormatPatientComponent } from '../../shared/edit-format-patient/edit-format-patient.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
  ]
})
export class PatientComponent {
  displayedColumns: string[] = ['name', 'age', 'diagnosis', 'actions'];
  dataSource = [];

  constructor(private patientService: PatientService, private dialog: MatDialog,private snackBar: MatSnackBar,){}

  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.dataSource = data.patients;
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
      },
    });
  }

  addPatient() {
    this.openFormat();
  }

  editPatient(record: any) {
    localStorage.setItem("patientId", record.id);
    localStorage.setItem("patientName", record.name);
    localStorage.setItem("patientAge", record.age);
    localStorage.setItem("patientDiagnosis", record.diagnosis);
    this.openFormatEdit()
  }

  deletePatient(record: any) {
    this.patientService.deletePatient(record.id).subscribe({
      next: (data) => {
        this.snackBar.open('Paciente eliminado con éxito', 'Aceptar', {
          duration: 5000,
        });
        window.location.reload();
      },
      error: (err) => {
        this.snackBar.open('Error al eliminar al paciente: '+err, 'Aceptar', {
          duration: 5000,
        });
      },
    })
  }

  openFormat() {
    this.dialog.open(FormatPatientComponent, {
      width: '70%',
    });
  }

  openFormatEdit() {
    this.dialog.open(EditFormatPatientComponent, {
      width: '70%',
    });
  }

}
