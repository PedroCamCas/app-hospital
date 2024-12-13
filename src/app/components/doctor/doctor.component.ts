import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../../services/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormatDoctorComponent } from '../../shared/format-doctor/format-doctor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditFormatDoctorComponent } from '../../shared/edit-format-doctor/edit-format-doctor.component';
import { DetailDoctorComponent } from '../../shared/detail-doctor/detail-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
  ],
})
export class DoctorComponent {

  displayedColumns: string[] = ['name', 'specialty', 'actions'];
  dataSource = []

  constructor(private doctorService: DoctorService, private dialog: MatDialog, private snackBar: MatSnackBar){}
  
  ngOnInit(){
    this.loadData()
  }

  loadData(){
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.dataSource = data.doctors;
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
      },
    });
  }

  showPatientsAssigment(record: any){
    this.openDetails(record.name, record.specialty, record.id)
  }

  addDoctor() {
    this.openFormat()
  }

  editDoctor(record: any) {
    localStorage.setItem("doctorName", record.name);
    localStorage.setItem("doctorSpecialty", record.specialty);
    localStorage.setItem("doctorId", record.id)
    this.openFormatEdit()
  }

  deleteDoctor(record: any) {
    this.doctorService.deleteDoctor(record.id).subscribe({
      next: (data) => {
        this.snackBar.open('Doctor eliminado con éxito', 'Aceptar', {
          duration: 5000,
        });
        window.location.reload();
      },
      error: (err) => {
        this.snackBar.open('Error al eliminar al doctor: '+err, 'Aceptar', {
          duration: 5000,
        });
      },
    })
  }

  openFormat() {
    this.dialog.open(FormatDoctorComponent, {
      width: '70%',
    });
  }

  openFormatEdit() {
    this.dialog.open(EditFormatDoctorComponent, {
      width: '70%',
    });
  }

  openDetails(name: string, specialty: string, id: number){
    this.dialog.open(DetailDoctorComponent, {
      data: {
        name: name,
        specialty: specialty,
        id: id,
      },
      width: '70%',
    });
  }

}
