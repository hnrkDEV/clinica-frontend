# Clínica Frontend

Frontend de um sistema de gestão de clínica desenvolvido com **Angular** e **TailwindCSS**, consumindo uma API REST construída em **Spring Boot**.

A aplicação permite o gerenciamento completo de pacientes, profissionais e agendamentos, além de exibir um histórico de auditoria das ações realizadas no sistema.

---

## Funcionalidades

- Cadastro e listagem de **pacientes**
- Cadastro e listagem de **profissionais**
- Criação e gerenciamento de **agendamentos**
- Cancelamento de agendamentos
- Visualização de **auditoria** (histórico de ações)
- Filtros por status
- Interface responsiva e moderna

---

## Tecnologias

- Angular (Standalone Components)
- TypeScript
- TailwindCSS
- Angular Animations
- RxJS

---

## UI/UX

- Layout estilo dashboard administrativo
- Sidebar responsiva com menu hambúrguer
- Componentes reutilizáveis
- Animações suaves e microinterações
- Design inspirado em sistemas SaaS modernos

---

## Integração

O frontend consome uma API REST com os seguintes módulos:

- `/pacientes`
- `/profissionais`
- `/agendamentos`
- `/auditorias`

A URL da API é configurada via `environment.ts`.

---

## ⚙️ Como executar

```bash
npm install
ng serve
```
A aplicação estará disponível em: `` http://localhost:4200 ``

## Observações
- Projeto estruturado com foco em escalabilidade e organização por features
- Utilização de variáveis de ambiente para integração com backend
- Arquitetura preparada para evolução (autenticação, dashboard, etc.)
