# Conectando Talentos — React + Tailwind

Aplicação web que simula uma rede profissional voltada ao futuro do trabalho. Permite listar, buscar, filtrar e visualizar perfis com informações pessoais, acadêmicas, técnicas e comportamentais. Inclui Dark Mode, modal de detalhes e ações de "Recomendar" e "Enviar mensagem".

## Resumo do projeto
- SPA construída com `React`, `Vite` e `Tailwind CSS`.
- Dados locais em `public/data/profissionais.json` com 60 perfis simulados.
- Listagem em cards; modal apresenta dados completos do perfil.
- Filtros por área, cidade/UF e tecnologia; busca textual.
- Botões funcionais: recomendação (contagem por `localStorage`) e envio de mensagem (persistência em `localStorage`).
- Dark Mode com persistência de preferência.

## Requisitos atendidos
- `HTML + React + Tailwind` com design responsivo e acessível.
- Modal com seções: informações pessoais e acadêmicas, experiências e habilidades técnicas, soft skills e hobbies/interesses, portfólio e certificados.
- Sistema de busca e filtros.
- Integração via JSON local (60 perfis).
- Modo escuro.

## Casos de uso
- Explorar profissionais por tecnologia específica.
- Filtrar por área (Tecnologia, Dados, Design, TI, Gestão etc.).
- Filtrar por cidade/UF e combinar com busca por cargo.
- Recomendar um perfil e enviar mensagem direta (armazenadas no `localStorage`).

## Instalação e execução
1. Instalar dependências: `npm install`
2. Rodar em desenvolvimento: `npm run dev`
3. Abrir no navegador: `http://localhost:5173/`
4. Lint do projeto: `npm run lint`

## Estrutura
- `src/App.jsx`: página principal com filtros, lista e modal.
- `src/components/*`: `ProfileCard`, `ProfileModal`, `Filters`, `DarkModeToggle`.
- `public/data/profissionais.json`: base local de perfis.
- `src/index.css`: importa `tailwindcss`.

## Link do repositório
- https://github.com/TimeDevFelipe/GS-Front-Web

## Integrantes do Grupo
- Raphael Aaron — RM 564067
- Felipe Catto — RM 562106
- Laura Dantas — RM 564064

## Observações
- Mensagens e recomendações são salvas por perfil em `localStorage` e não exigem backend.
- Ícone e avatar padrão: `public/images/placeholder.svg`.
