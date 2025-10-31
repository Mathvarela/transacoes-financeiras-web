import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, formato: Intl.DateTimeFormatOptions = {}): string {
    if (!value) return '';

    const data = typeof value === 'string' ? new Date(value) : value;

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...formato
    }).format(data);
  }
}