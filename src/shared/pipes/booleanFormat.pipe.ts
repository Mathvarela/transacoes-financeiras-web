import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToText',
  standalone: true
})
export class BooleanFormatPipe implements PipeTransform {
  transform(value: boolean | null | undefined): string {
    return value ? 'Sim' : !value ? 'Não' : '';
  }
}