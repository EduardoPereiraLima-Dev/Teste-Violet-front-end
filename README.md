#  Sistema de Gerenciamento de Agricultores (Frontend)

Este é o frontend de um sistema completo para gerenciar o cadastro de agricultores, incluindo operações CRUD (Criar, Ler, Atualizar, Excluir), validações de dados e uma interface de usuário moderna e responsiva.

## ✨ Funcionalidades

*   **Cadastro de Agricultores (CRUD):**
    *   **Criar:** Formulário para adicionar novos agricultores com validação de dados.
    *   **Ler:** Listagem paginada e filtrável de agricultores, com visualização detalhada de cada registro.
    *   **Atualizar:** Formulário para editar informações de agricultores existentes, incluindo status de atividade.
    *   **Excluir:** Funcionalidade de exclusão com confirmação, que desativa automaticamente agricultores ativos antes de remover o registro.
*   **Validação de Dados:** Validação de CPF e outros campos do formulário.
*   **Responsividade:** Layout adaptável para diferentes tamanhos de tela (desktop, tablet, mobile).
*   **Notificações:** Uso de toasts para feedback de sucesso e erro das operações.
*   **Tratamento de Erros:** Mecanismo robusto para capturar e exibir mensagens de erro claras da API.
*   **Estados de Carregamento:** Indicadores visuais durante o carregamento de dados e operações.

## 🚀 Tecnologias Utilizadas

*   **Next.js 14 (App Router):** Framework React para construção de aplicações web.
*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
*   **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
*   **Shadcn/ui:** Coleção de componentes de UI reutilizáveis e acessíveis.
*   **Zod:** Biblioteca de validação de esquemas para formulários.
*   **React Hook Form:** Biblioteca para gerenciamento de formulários com validação.
*   **Axios:** Cliente HTTP para fazer requisições à API de backend.
*   **`date-fns`:** Biblioteca para manipulação e formatação de datas.
*   **`react-hot-toast`:** Biblioteca para exibir notificações de forma simples.
*   **Lucide React:** Biblioteca de ícones.

## ⚙️ Configuração do Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

*   Node.js (versão 18 ou superior)
*   npm ou Yarn (npm é recomendado, pois o `package.json` usa `npm install`)

### Instalação

1.  **Clone o repositório:**
    \`\`\`bash
    git clone gh repo clone EduardoPereiraLima-Dev/Teste-Violet-front-end
    cd agricultor-frontend
    \`\`\`
    (Se você baixou o código diretamente do v0, descompacte o arquivo e navegue até a pasta do projeto.)

2.  **Instale as dependências:**
    \`\`\`bash
    npm install
    \`\`\`

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da sua API de backend:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3000
