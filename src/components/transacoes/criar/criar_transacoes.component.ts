import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITransacaoCriar } from '../../../models/transacoes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { cpfValidator } from '../../../shared/validators/cpfValidator';
import { TransacoesService } from '../../../services/transacoes.services';
import { ITipoTransacao } from '../../../models/tipoTransacao';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MensagemSucessoErroDialogComponent } from '../../../shared/components/mensagem-sucesso-erro/mensagem-sucesso-erro.component';


@Component({
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule
    ],
    selector: 'app-criar-transacoes',
    templateUrl: 'criar_transacoes.component.html',
    styleUrls: ['./criar_transacoes.component.scss']
})

export class CriarTransacoesComponent implements OnInit {
    transacaoForm: FormGroup;
    tiposTransacao: Array<ITipoTransacao> = [{ id: 1, descricao: 'Crédito' }, { id: 2, descricao: 'Débito' }];
    constructor(
        private fb: FormBuilder,
        public transacaoService: TransacoesService,
        private router: Router,
        private dialog: MatDialog) {

        this.transacaoForm = this.fb.group({
            cpf: ['', [Validators.required, cpfValidator]],
            valor: [null, [Validators.required, Validators.min(0.01)]],
            data: ['', Validators.required],
            tipoTransacao: ['', Validators.required],
            cancelada: [false]
        });
    }

    async onSubmit() {
        if (this.transacaoForm.valid) {
            let payload: ITransacaoCriar = {
                cpf: this.transacaoForm.controls['cpf'].value?.replace(/\D/g, ''),
                valor: this.transacaoForm.controls['valor'].value,
                data: this.transacaoForm.controls['data'].value,
                tipoTransacao: this.transacaoForm.controls['tipoTransacao'].value,
                cancelada: this.transacaoForm.controls['cancelada'].value
            };

            try {
                const resposta = await firstValueFrom(this.transacaoService.criarTransacao(payload));

                this.router.navigate(['/listar-transacoes']);
                this.mensagemAviso('Transação criada com sucesso!', 'success');
            } catch (error) {
                this.mensagemAviso('Ocorreu um erro', 'error');
            }

        }
    }

    ngOnInit() { }

    redirectTo(rota: string) {
        this.router.navigate([rota]);
    }

    mensagemAviso(mensagem: string, tipo: 'success' | 'error') {
        const dialogRef = this.dialog.open(MensagemSucessoErroDialogComponent, {
            data: { mensagem, tipo }
        });

        setTimeout(() => {
            dialogRef.close();
        }, 3000);
    }
}