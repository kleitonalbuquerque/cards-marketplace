# Cards Marketplace - Vue 3 + TypeScript

Este projeto é um sistema de marketplace de cartas colecionáveis, onde usuários podem cadastrar cartas, criar solicitações de troca e gerenciar suas próprias trocas.

## Funcionalidades

- Cadastro e login de usuários
- Visualização de todas as cartas disponíveis
- Adição de cartas à conta do usuário
- Criação de solicitações de troca (escolha cartas para oferecer e receber)
- Listagem das solicitações de troca criadas
- Cancelamento de solicitações de troca

## Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```
ou
```bash
yarn install
```

### 2. Rode o projeto em modo desenvolvimento

```bash
npm run dev
```
ou
```bash
yarn dev
```

O projeto estará disponível em `http://localhost:5173`.

### 3. Build para produção

```bash
npm run build
```
ou
```bash
yarn build
```

## Observações

- O frontend se comunica com a API hospedada em [https://cards-marketplace-api-2fjj.onrender.com](https://cards-marketplace-api-2fjj.onrender.com).
- O token de autenticação é salvo no `localStorage` e enviado automaticamente nas requisições autenticadas.
- **Ressalva:** O endpoint `GET /trades` da API pode não retornar corretamente todas as solicitações de troca registradas do usuário logado. Caso não apareçam as solicitações criadas, verifique o backend ou entre em contato com o responsável pela API.

## Estrutura principal

- `src/pages/Marketplace.vue` — Visualização e paginação das cartas disponíveis
- `src/pages/CreateRequest.vue` — Criação de solicitações de troca
- `src/pages/Requests.vue` — Listagem e cancelamento das solicitações do usuário
- `src/stores/` — Stores Pinia para gerenciamento de estado global
- `src/services/` — Serviços para comunicação com a API

---

Para dúvidas ou# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
