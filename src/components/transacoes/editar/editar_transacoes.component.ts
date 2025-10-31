import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransacaoEditar } from '../../../models/transacoes';
import { TransacoesService } from '../../../services/transacoes.services';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cpfValidator } from '../../../shared/validators/cpfValidator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ITipoTransacao } from '../../../models/tipoTransacao';
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
        CommonModule],
    selector: 'app-editar-transacoes',
    templateUrl: 'editar_transacoes.component.html',
    styleUrls: ['./editar_transacoes.component.scss']

})

export class EditarTransacoesComponent implements OnInit {
    id: string | null = null;
    transacaoEditar: ITransacaoEditar = {} as ITransacaoEditar;
    tiposTransacao: Array<ITipoTransacao> = [{ id: 1, descricao: 'Crédito' }, { id: 2, descricao: 'Débito' }];

    transacaoForm: FormGroup;


    constructor(
        private route: ActivatedRoute,
        private transacaoService: TransacoesService,
        private router: Router,
        private fb: FormBuilder,
        private dialog: MatDialog) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.obterTransacao();

        this.transacaoForm = this.fb.group({
            cpf: ['', [Validators.required, cpfValidator]],
            valor: [null, [Validators.required, Validators.min(0.01)]],
            data: ['', Validators.required],
            tipoTransacao: ['', Validators.required],
            cancelada: [false]
        });
    }

    async obterTransacao() {

        const resposta = await firstValueFrom(this.transacaoService.recuperarTransacaoById(this.id as any));

        try {
            this.transacaoEditar = resposta;
            this.preencherForm(resposta);
        } catch (error) {
            this.mensagemAviso('Ocorreu um erro', 'error');
            this.router.navigate(['/']);
        }
    }

    preencherForm(payload: ITransacaoEditar) {
        this.transacaoForm.controls['cpf'].setValue(payload.cpf);
        this.transacaoForm.controls['valor'].setValue(payload.valor);
        this.transacaoForm.controls['data'].setValue(payload.data);
        this.transacaoForm.controls['tipoTransacao'].setValue(payload.tipoTransacao);
        this.transacaoForm.controls['cancelada'].setValue(payload.cancelada);
    }

    ngOnInit() { }

    async onSubmit() {
        if (this.transacaoForm.valid) {
            let payload: ITransacaoEditar = {
                id: this.transacaoEditar.id,
                cpf: this.transacaoForm.controls['cpf'].value?.replace(/\D/g, ''),
                valor: this.transacaoForm.controls['valor'].value,
                data: this.transacaoForm.controls['data'].value,
                tipoTransacao: this.transacaoForm.controls['tipoTransacao'].value,
                cancelada: this.transacaoForm.controls['cancelada'].value
            };

            try {
                const resposta = await firstValueFrom(this.transacaoService.editarTransacao(payload));

                this.router.navigate(['/listar-transacoes']);
                this.mensagemAviso('Transação atualizada com sucesso!', 'success');
            } catch (error) {
                this.mensagemAviso('Ocorreu um erro', 'error');
            }

        }
    }

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