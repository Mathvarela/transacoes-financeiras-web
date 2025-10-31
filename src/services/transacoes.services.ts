import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransacaoCriar, ITransacaoDeletar, ITransacaoEditar, ITransacaoListar } from '../models/transacoes';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransacoesService {
    URL_BASE = 'https://localhost:7166/api';

    constructor(private httpClient: HttpClient) { }

    public recuperarTodasAsTransacoes() {
        return this.httpClient.get<ITransacaoListar[]>(`${this.URL_BASE}/transacoes`);
    }

    public recuperarTransacaoById(idTransacao: number) {
        return this.httpClient.get<ITransacaoEditar>(`${this.URL_BASE}/transacoes/${idTransacao}`);
    }

    public deletarTransacao(transacao: ITransacaoDeletar) {
        return this.httpClient.delete(`${this.URL_BASE}/transacoes/${transacao.idTransacao}`)
    }

    public criarTransacao(transacao: ITransacaoCriar) {
        return this.httpClient.post(`${this.URL_BASE}/transacoes`, transacao);
    }

    public editarTransacao(transacao: ITransacaoEditar) {
        return this.httpClient.put(`${this.URL_BASE}/transacoes`, transacao);
    }
}