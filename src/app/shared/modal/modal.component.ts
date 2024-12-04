import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-container">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <img [src]=data.imageUrl alt="Modal icon" class="modal-image" />
      <p>{{ data.message }}</p>
      <button mat-button (click)="close()">Aceptar</button>
    </div>
  `,
  styles: [`
    .modal-container {
      text-align: center;
      padding: 16px;
    }
    .modal-image {
      max-width: 30%;
      height: auto;
      margin: 16px 0;
    }
    button {
      margin-top: 16px;
    }
  `]
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; imageUrl: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
