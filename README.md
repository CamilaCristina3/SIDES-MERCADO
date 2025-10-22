# 🌾 SIDES Mercado

Plataforma digital que conecta agricultores e consumidores, permitindo o cadastro e a venda de produtos agrícolas de forma simples, segura e transparente.

- Frontend em React (Vite) com React Router e estado global do carrinho
- Backend em Node.js/Express com JWT e MySQL

---

## 🧰 Requisitos

- Node.js 18+
- npm 9+
- MySQL 8.0+
- Navegador moderno (Chrome/Edge/Firefox)

---

## 🚀 Como rodar o projeto

### 🖥️ Frontend

1. Entrar no diretório
   ```bash
   cd SIDES/Frontend
   ```
2. Instalar dependências
   ```bash
   npm install
   npm install react-router-dom
   ```
3. Executar em desenvolvimento
   ```bash
   npm run dev
   ```

> Proxy do Vite (dev): as rotas `/api` e `/uploads` são encaminhadas para `http://localhost:3000`.

### ⚙️ Backend

1. Entrar no diretório
   ```bash
   cd SIDES/Backend
   ```
2. Criar arquivo `.env` na raiz do backend
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=sides_mercado

   JWT_SECRET=chave_super_segura_aqui
   JWT_EXPIRES_IN=7d
   ```
3. Instalar dependências
   ```bash
   npm install
   ```
4. Iniciar servidor
   ```bash
   npm run dev      # desenvolvimento
   # ou
   node server.js   # produção
   ```

---

## 📂 Estrutura de Pastas

SIDES/
- Backend/
  - config/        – Conexão com MySQL
  - controllers/   – Lógica de negócio (Produto, Utilizador, etc.)
  - middleware/    – Autenticação e permissões
  - models/        – Acesso a dados
  - routes/        – Rotas da API REST
  - uploads/images – Imagens de produtos (estático em `/uploads/images`)
  - server.js      – Inicialização do servidor
- Frontend/
  - src/
    - components/  – Componentes reutilizáveis (UploadImagem, NovoProduto, etc.)
    - context/     – Estado global (carrinho)
    - data/        – Produtos mock e dados estáticos
    - pages/       – Páginas (Home, Produtos, Categorias, etc.)
    - App.jsx      – Layout e rotas

---

## 🖼️ Imagens locais e Upload

- Diretório de armazenamento (backend): `SIDES/Backend/uploads/images`
- Servido como estático em: `/uploads/images/...`
- Endpoint de upload (apenas admin): `POST /api/uploads/image`
  - Content-Type: `multipart/form-data`
  - Campo de ficheiro: `image`
  - Header: `Authorization: Bearer <JWT>`
- Frontend (dev) consome `/uploads` via proxy do Vite (não precisa host absoluto).

Exemplos
- cURL (admin):
  ```bash
  curl -X POST http://localhost:3000/api/uploads/image \
       -H "Authorization: Bearer <TOKEN_ADMIN>" \
       -F image=@C:\\caminho\\foto.jpg
  ```
- Frontend: `src/components/UploadImagem.jsx` (já implementado) envia o ficheiro e retorna `data.url` (ex.: `/uploads/images/img-...jpg`).

---

## 🛒 Fluxo do Carrinho

- Adicione itens nas páginas de Produtos, Categorias ou Home
- Ajuste no `/carrinho` (+, −, remover, limpar)
- Finalize no `/checkout` (entrega ou retirada)

---

## 🔗 Rotas Principais da API

- 🔐 Autenticação
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `PUT /api/auth/password`

- 👤 Utilizadores
  - `POST /api/utilizadores/register`
  - `GET /api/utilizadores` (admin)
  - `GET /api/utilizadores/perfil`
  - `PUT /api/utilizadores/atualizar`
  - `PUT /api/utilizadores/:id/estado` (admin)
  - `PUT /api/utilizadores/:id/role` (admin)

- 🏠 Moradas
  - `GET /api/utilizadores/moradas`
  - `POST /api/utilizadores/moradas`
  - `PUT /api/utilizadores/moradas/:id`
  - `DELETE /api/utilizadores/moradas/:id`

- ❤️ Favoritos
  - `GET /api/favoritos`
  - `POST /api/favoritos`
  - `DELETE /api/favoritos/:produto_id`

- 🛍️ Produtos
  - `GET /api/produtos`
  - `GET /api/produtos/:slug`
  - `POST /api/produtos` (auth)
  - `PUT /api/produtos/:id` (auth)
  - `DELETE /api/produtos/:id` (auth)

- 🧺 Carrinho
  - `GET /api/carrinho`
  - `POST /api/carrinho`
  - `PUT /api/carrinho/:id`
  - `DELETE /api/carrinho/:id`

- 🧾 Pedidos
  - `POST /api/pedidos`
  - `GET /api/pedidos`
  - `GET /api/pedidos/:id`
  - `PUT /api/pedidos/:id/cancelar`

- 📬 Contactos
  - `POST /api/contactos`
  - `GET /api/contactos` (auth)

---

## 🧠 Funcionalidades do Backend

- Autenticação via JWT (roles: A=admin, P=produtor, C=consumidor)
- Gestão de utilizadores, produtos, categorias, favoritos e pedidos
- Upload e exibição de imagens locais
- Carrinho de compras funcional
- Sistema de endereços e entregas
- Estrutura modular e escalável

---

## 💾 Banco de Dados

- MySQL configurado em `Backend/src/config/database.js`
- Base padrão: `sides_mercado`

---

## 🧑‍💻 Créditos

Desenvolvido por Camila Cuambe / Equipa SIDES – projeto académico/piloto para mercado digital de produtos agrícolas.

---

## 🏁 Status

- ✅ Frontend funcional
- ✅ Backend com autenticação JWT
- ✅ Rotas REST integradas
- 🧱 Base de dados MySQL (sides_mercado)
- 📦 Upload de imagens configurado
- 🚀 Pronto para expansão com novos módulos

