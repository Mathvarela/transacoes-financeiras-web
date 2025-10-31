import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/listar-transacoes', pathMatch: 'full' },
    {
        path: 'listar-transacoes',
        loadComponent: () => import('../components/transacoes/listar/listar_transacoes.component').then(m => m.ListarTransacoesComponent)
    },
    {
        path: 'adicionar-transacoes',
        loadComponent: () => import('../components/transacoes/criar/criar_transacoes.component').then(m => m.CriarTransacoesComponent)
    },
    {
        path: 'editar-transacoes/:id',
        loadComponent: () => import('../components/transacoes/editar/editar_transacoes.component').then(m => m.EditarTransacoesComponent)
    },
];
