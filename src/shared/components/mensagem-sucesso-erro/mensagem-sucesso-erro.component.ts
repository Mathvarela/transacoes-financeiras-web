// success-error-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-success-error-dialog',
    standalone: true,
    imports: [MatDialogModule, CommonModule],
    template: `
    <div [ngClass]="data.tipo">
      <p>{{ data.mensagem }}</p>
    </div>
  `,
    styles: [`
    .success {
      background-color: #d4edda;
      color: #155724;
      padding: 16px;
      border-radius: 4px;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
      padding: 16px;
      border-radius: 4px;
    }
  `]
})
export class MensagemSucessoErroDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { mensagem: string, tipo: 'success' | 'error' }) { }
}