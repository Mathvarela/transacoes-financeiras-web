# TransacoesFinanceirasWeb

O projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Versão do Node instalado
Versão utilizada `20.19.5`

## Versão do NPM instalado
Versão utilizada `10.8.2`

## Pacotes Utilizados
* Angular Material com a versão `18.2.14`

Foram usados diversos modulos do Angular Material, como `MatIconModule`,`MatDatepickerModule`,``MatNativeDateModule``,``MatDialogModule``,``MatPaginatorModule``,``MatSortModule``,``MatTableModule``, `MatFormFieldModule`,`MatInputModule`,`MatSelectModule`,`MatButtonModule` entre outros.

## O projeto
Projeto foi desenvolvido de forma simples, CRUD para gerenciamento de transações financeiras, porem tentando utilizar um pouco de cada component do angular. Foi utilizado a parte de Formularios reativos, Validações customizadas como a de CPF através do validators. O projeto possui a um pouco de PipeTransform para os campos em que é necessarios a transformação das informações para o usuário final, como a conversão da data para o formato PT-BR, valores monetarios e até mesmo a formatação do CPF. Foi iniciado a ideia de componentes reutilizaveis, pelo componente de mensagem de sucesso e erro. Falta melhorar, adicionando ele em um componente "Base" e que os componentes de negócio caso queiram utilizar, façam o `extends` e com isso utilize de forma mais limpa a utilização da chamada. O projeto está um pouco responsivo, ainda ha melhorar. A parte de models, temos apenas duas interfaces, `tipoTransacao.ts` e `transacoes.ts` e na parte do `services` temos apenas um `transacoes.services.ts`.

## Para executar o projeto

* Acesse a raiz do projeto e execute `npm run start`.
* Navegue para `http://localhost:4200/`;




