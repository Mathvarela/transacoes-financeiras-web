import { Pipe, PipeTransform } from '@angular/core';
import { TipoTransacaoEnum } from '../enum/tipoTransacao.enum';

@Pipe({
  name: 'tipoTransacaoFormat',
  standalone: true
})
export class TipoTransacaoFormatPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return TipoTransacaoEnum.Credito == value ? 'Crédito' : TipoTransacaoEnum.Debito == value ? 'Débito' : '';
  }
}