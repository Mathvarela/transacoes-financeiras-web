# Visão Geral do Projeto

Este é um aplicativo web para gerenciar transações financeiras. É um aplicativo CRUD (Criar, Ler, Atualizar, Excluir) simples, construído com Angular para o frontend e um backend .NET 8 para renderização no lado do servidor. O aplicativo utiliza Angular Material para os componentes da interface do usuário.

## Tecnologias Chave

*   **Frontend:** Angular, TypeScript, Angular Material
*   **Backend:** .NET 8
*   **Gerenciador de Pacotes:** npm

# Construção e Execução

*   **Instalar dependências:** `npm install`
*   **Executar o aplicativo:** `npm run start`
    *   Isso iniciará um servidor de desenvolvimento em `http://localhost:4200/`.

# Convenções de Desenvolvimento

## Estrutura do Projeto

*   `src/`: Contém o código-fonte principal do aplicativo.
*   `src/app/`: Contém os componentes, rotas e módulos do aplicativo Angular.
*   `src/components/`: Contém os componentes do aplicativo, organizados por funcionalidade.
*   `src/models/`: Contém os modelos de dados para o aplicativo.
*   `src/services/`: Contém os serviços para interagir com o backend.
*   `src/shared/`: Contém componentes compartilhados, enums, pipes e validadores.

## Estilo de Codificação

*   O projeto usa TypeScript tanto para o frontend quanto para o backend.
*   O projeto usa SCSS para estilização.
*   O projeto segue a estrutura padrão de projetos Angular.
*   Pipes personalizados são usados para formatar dados (por exemplo, datas, CPF).
*   Validadores personalizados são usados para validação de formulários (por exemplo, validação de CPF).