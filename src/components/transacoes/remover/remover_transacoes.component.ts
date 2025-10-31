import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ITransacaoListar } from '../../../models/transacoes';
import { CommonModule } from '@angular/common';
import { CpfFormatPipe } from '../../../shared/pipes/cpfFormat.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-remover-transacoes',
    standalone: true,
    imports: [MatDialogModule, CommonModule, CpfFormatPipe, MatButtonModule],
    templateUrl: 'remover_transacoes.component.html'
})

export class RemoverTransacoesComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<RemoverTransacoesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { transacao: ITransacaoListar }
    ) { }

    fechar() {
        this.dialogRef.close();
    }

    confirmar() {
        this.dialogRef.close({ confirmarExclusao: true });
    }

    ngOnInit() { }
}