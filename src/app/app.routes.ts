import { Routes } from '@angular/router';
import { ListarTransacoesComponent } from '../components/transacoes/listar/listar_transacoes.component';
import { CriarTransacoesComponent } from '../components/transacoes/criar/criar_transacoes.component';
import { EditarTransacoesComponent } from '../components/transacoes/editar/editar_transacoes.component';

export const routes: Routes = [
    { path: '', 'redirectTo': '/listar-transacoes', pathMatch: 'full' },
    { path: 'listar-transacoes', component: ListarTransacoesComponent },
    { path: 'adicionar-transacoes', component: CriarTransacoesComponent },
    { path: 'editar-transacoes/:id', component: EditarTransacoesComponent },
];
