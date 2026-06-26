# 📦 Sistema de Controle de Estoque 

Um sistema Full Stack completo, intuitivo e responsivo para gestão de inventário. Desenvolvido do zero para resolver gargalos reais de controle de estoque, aplicando conceitos modernos de arquitetura, tipagem estática e otimização de requisições.

> **Nota de Arquitetura:** Este projeto foi desenvolvido originalmente sob demanda para um cliente real e colocado em produção (Vercel + Hostinger VPS). 

---

## ✨ Principais Funcionalidades

* **Gestão de Inventário:** Cadastro, edição, exclusão e listagem detalhada de itens.
* **Busca Instantânea Otimizada:** Barra de pesquisa com aplicação de *Debounce*, evitando sobrecarga da API durante a digitação do usuário.
* **Controle de Acesso Segura:** Autenticação e autorização de ponta a ponta via **JWT**.
* **Interface Responsiva:** Experiência fluida garantida em desktops, tablets e smartphones.
* **Feedback de Estado:** Tratamento visual de loading, sucessos e erros de requisição.

---

## 🛠️ Stack Tecnológica

O ecossistema do projeto foi unificado em **TypeScript** para garantir contratos estritos de dados entre o cliente e o servidor.

### **Front-end**
* **[Next.js](https://nextjs.org/)** — Framework React
* **TypeScript** — Segurança e escalabilidade
* **CSS Modules** — Estilização escopada e modular
* **Vercel** — Hospedagem da aplicação web

### **Back-end**
* **[Node.js](https://nodejs.org/) + [Fastify](https://fastify.dev/)** — API REST de altíssima performance
* **TypeScript**
* **[Prisma ORM](https://www.prisma.io/)** — Modelagem e migrações do banco
* **PostgreSQL** — Banco de dados relacional
* **JWT (JSON Web Token)** — Estratégia de autenticação
* **Hostinger VPS** — Hospedagem do servidor e DB

---

## 🧠 Destaques de Engenharia

1. **End-to-End Type Safety:** A tipagem rigorosa no Prisma gerando as entidades que alimentam o Fastify, e o Front-end consumindo interfaces idênticas, reduziu a quase zero os erros de *runtime* por divergência de dados.
2. **Implementação de Debouncer:** No input de busca de produtos, foi programado um delay de retenção na digitação. Isso reduziu em cerca de 70% o número de chamadas ao banco de dados em buscas por texto.
3. **Validação de Rotas:** Todos os endpoints da API foram rigorosamente testados, documentados e estressados via **Postman** antes da integração com a interface.

---

## 🚀 Como rodar este projeto localmente

### Pré-requisitos
* Node.js (v18+)
* Uma instância local ou remota do PostgreSQL rodando.

### 1. Configurando o Back-end

```bash
# Entre na pasta do servidor
$ cd backend

# Instale as dependências
$ npm install

# Crie um arquivo .env na raiz do backend e adicione:
# DATABASE_URL="postgresql://user:password@localhost:5432/stock_db"
# JWT_SECRET="sua_chave_secreta"

# Rodando as migrações do Prisma para criar as tabelas
$ npx prisma migrate dev

# Inicie o servidor
$ npm run dev
