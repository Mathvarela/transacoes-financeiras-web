import { TipoTransacaoEnum } from "../shared/enum/tipoTransacao.enum";

export interface ITransacaoCriar {
    cpf: string;
    valor: number;
    data: string;
    tipoTransacao: TipoTransacaoEnum;
    cancelada: boolean;
}

export interface ITransacaoEditar {
    id: number;
    cpf: string;
    valor: number;
    data: string;
    tipoTransacao: TipoTransacaoEnum;
    cancelada: boolean;
}

export interface ITransacaoListar {
    id: number;
    cpf: string;
    valor: number;
    data: string;
    tipoTransacao: TipoTransacaoEnum;
    cancelada: boolean;
}

export interface ITransacaoDeletar {
    idTransacao: number;
}