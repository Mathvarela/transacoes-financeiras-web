import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ITransacaoListar } from '../../../models/transacoes';
import { TransacoesService } from '../../../services/transacoes.services';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BooleanFormatPipe } from '../../../shared/pipes/booleanFormat.pipe';
import { DateFormatPipe } from '../../../shared/pipes/dateFormat.pipe';
import { CpfFormatPipe } from '../../../shared/pipes/cpfFormat.pipe';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ITipoTransacao } from '../../../models/tipoTransacao';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RemoverTransacoesComponent } from '../remover/remover_transacoes.component';
import { firstValueFrom } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { cpfValidator } from '../../../shared/validators/cpfValidator';
import { TipoTransacaoFormatPipe } from '../../../shared/pipes/tipoTransacaoFormat.pipe';
import { TipoTransacaoEnum } from '../../../shared/enum/tipoTransacao.enum';
import { MensagemSucessoErroDialogComponent } from '../../../shared/components/mensagem-sucesso-erro/mensagem-sucesso-erro.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BooleanFormatPipe,
        TipoTransacaoFormatPipe,
        DateFormatPipe,
        CpfFormatPipe,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
    ],
    selector: 'app-listar-transacoes',
    templateUrl: 'listar_transacoes.component.html',
    styleUrls: ['./listar_transacoes.component.scss']
})

export class ListarTransacoesComponent implements OnInit, AfterViewInit {
    listaTransacoes: Array<ITransacaoListar> = new Array<ITransacaoListar>();
    tiposTransacao: Array<ITipoTransacao> = [{ id: 1, descricao: 'Crédito' }, { id: 2, descricao: 'Débito' }];
    opcoesCancelamento = [{ id: 1, valor: 'Sim' }, { id: 0, valor: 'Não' }];

    dataSource = new MatTableDataSource<ITransacaoListar>();
    displayedColumns: string[] = ['id', 'cpf', 'valor', 'tipoTransacao', 'data', 'cancelada', 'acoes'];

    pageSize = 5;
    currentPage = 0;
    totalItems = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    transacaoForm: FormGroup;

    constructor(
        public transacoesService: TransacoesService,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {
        this.transacaoForm = this.fb.group({
            cpf: ['', [cpfValidator]],
            dataInicio: [''],
            dataFim: [''],
            tipoTransacao: [''],
            cancelado: [null]
        });
    }

    ngOnInit() {
        this.recuperaTodasAsTransacoes();
    }

    ngAfterViewInit() {
        this.sort?.sortChange.subscribe(() => {
            this.aplicarFiltrosOrdenacaoPaginacao();
        });
    }

    recuperaTodasAsTransacoes() {
        this.transacoesService.recuperarTodasAsTransacoes()
            .subscribe((response) => {
                this.listaTransacoes = response;
                this.aplicarFiltrosOrdenacaoPaginacao();
            });

    }


    pesquisar() {
        this.currentPage = 0;
        this.aplicarFiltrosOrdenacaoPaginacao();
    }

    mudarPagina(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.aplicarFiltrosOrdenacaoPaginacao();
    }

    aplicarFiltrosOrdenacaoPaginacao() {
        const { cpf, tipoTransacao, dataInicio, dataFim, cancelado } = this.transacaoForm.value;

        let filtrados = [...this.listaTransacoes];

        if (cpf) {
            filtrados = filtrados.filter(t => t.cpf.includes(cpf));
        }
        if (tipoTransacao) {
            filtrados = filtrados.filter(t => t.tipoTransacao === tipoTransacao);
        }
        if (cancelado !== '' && cancelado !== null && cancelado !== undefined) {
            filtrados = filtrados.filter(t => t.cancelada === !!Number(cancelado));
        }
        if (dataInicio) {
            filtrados = filtrados.filter(t => new Date(t.data) >= new Date(dataInicio));
        }
        if (dataFim) {
            filtrados = filtrados.filter(t => new Date(t.data) <= new Date(dataFim));
        }

        this.dataSource.data = filtrados;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    getTotalCreditos() {
        return this.dataSource.data.filter((transacao) => transacao.tipoTransacao == TipoTransacaoEnum.Credito).map((value) => (value.valor)).reduce((a, b) => a + b, 0);
    }

    getTotalDebitos() {
        return this.dataSource.data.filter((transacao) => transacao.tipoTransacao == TipoTransacaoEnum.Debito).map((value) => (value.valor)).reduce((a, b) => a + b, 0);
    }

    getTotalGeral() {
        return this.getTotalCreditos() - this.getTotalDebitos();
    }

    acionarConfirmacaoDeletarTransacao(transacao: ITransacaoListar) {
        const dialogRef = this.dialog.open(RemoverTransacoesComponent, {
            width: '350px',
            data: { transacao }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result?.confirmarExclusao) {
                this.deletarTransacao(transacao.id);
            }
        })
    }

    async deletarTransacao(idTransacao: number) {

        try {
            const response = await firstValueFrom(this.transacoesService.deletarTransacao({ idTransacao }))
            this.recuperaTodasAsTransacoes();
            this.mensagemAviso('Transação deletada com sucesso!', 'success');
        } catch (error) {
            this.mensagemAviso('Ocorreu um erro', 'error');
        }
    }

    editarTransacao(id: number) {
        this.router.navigate(['/editar-transacoes', id]);
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