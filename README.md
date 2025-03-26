# 🎯 Jogo da Forca (Hangman)

Um jogo da forca interativo e responsivo desenvolvido com **Next.js**, **Tailwind CSS** e **Redux Toolkit**. O usuário pode jogar diretamente no navegador, alternar entre temas claro e escuro e ver o boneco da forca sendo desenhado a cada erro.

## 🚀 Como rodar o projeto localmente

Clone o repositório e instale as dependências com:

```bash
npm install
```

Inicie o servidor de desenvolvimento com:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para jogar.

## ✨ Funcionalidades

- Teclado virtual e suporte ao teclado físico
- Gerador de palavras aleatórias (em português)
- Visual do boneco desenhado progressivamente
- Detecção de vitória e derrota com mensagens visuais
- Tema **claro** e **escuro** com alternância dinâmica
- Interface moderna, responsiva e acessível

## 🧠 Tecnologias usadas

- [Next.js](https://nextjs.org/) – Framework React moderno com suporte a SSR/SSG
- [Tailwind CSS](https://tailwindcss.com/) – Utilitários CSS com tema claro/escuro
- [Redux Toolkit](https://redux-toolkit.js.org/) – Gerenciamento de estado simples e eficiente
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática robusta

## 📁 Estrutura

```
├── app/
│   └── page.tsx                # Página principal
├── client/
│   ├── providers/redux-provider.tsx
│   └── store/...
├── components/
│   └── pages/home/client.tsx  # Componentes do jogo
├── constants/words.ts         # Lista de palavras
├── lib/utils/...
├── styles/
│   └── main.scss              # Tema global (Tailwind + cores)
```

## 📦 Build e Deploy

Para gerar a versão de produção:

```bash
npm run build
npm start
```

Este projeto pode ser facilmente implantado na Vercel, Netlify, ou em um cluster Kubernetes com Ingress Controller (ver aula do Código Fluente 🧠).

---

Feito com 💙 por [Toti](https://www.codigofluente.com.br)
