import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value?.replace(/\D/g, '');

  if (!cpf) {
    return null;
  }

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return { cpfInvalido: true };
  }

  const calcDigito = (factor: number) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const resto = (total * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const digito1 = calcDigito(10);
  const digito2 = calcDigito(11);

  if (digito1 !== parseInt(cpf[9]) || digito2 !== parseInt(cpf[10])) {
    return { cpfInvalido: true };
  }

  return null;
}