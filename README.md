# SIDES Mercado

Frontend em React com rotas e carrinho funcional. Backend em Express com JWT, gestão de utilizadores, moradas, favoritos e pedidos.

## Como rodar

1. Entre no frontend:
   - `cd SIDES/Frontend`
2. Instale dependências:
   - `npm i`
3. Garanta o roteador instalado:
   - `npm i react-router-dom`
4. Rode em desenvolvimento:
   - `npm run dev`

### Backend

1. Entre no backend:
   - `cd SIDES/Backend`
2. Configure `.env`:
   - `DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME`
   - `JWT_SECRET`, `JWT_EXPIRES_IN=7d`
3. Instale dependências:
   - `npm i`
4. Inicie:
   - `node server.js` ou `npm run dev`

## Estrutura relevante

- `src/main.jsx` – Router + `CartProvider`
- `src/App.jsx` – Layout e rotas
- `src/context/CartContext.jsx` – Estado global do carrinho
- `src/data/mockProducts.js` – Produtos de exemplo
- `src/pages/` – Páginas: `Home`, `Sobre`, `Solucoes`, `Produtos`, `Categorias`, `Cadastro`, `Carrinho`, `Checkout`

## Fluxo do carrinho

- Adicionar itens nas páginas de `Produtos`, `Categorias` ou `Home`.
- Ajustar no `/carrinho` (+, −, remover, limpar).
- Finalizar no `/checkout` (entrega ou retirar no local).
- Backend rotas:
  - Auth: `POST /api/auth/login`, `POST /api/auth/logout`, `PUT /api/auth/password`
  - Utilizadores: `POST /api/utilizadores/register`, `GET /api/utilizadores` (admin), `GET /api/utilizadores/perfil`, `PUT /api/utilizadores/atualizar`, `PUT /api/utilizadores/:id/estado` (admin), `PUT /api/utilizadores/:id/role` (admin)
  - Moradas: `GET/POST/PUT/DELETE /api/utilizadores/moradas`
  - Favoritos: `GET/POST /api/favoritos`, `DELETE /api/favoritos/:produto_id`
  - Produtos: `GET /api/produtos`, `GET /api/produtos/:slug`, `POST/PUT/DELETE /api/produtos` (auth)
  - Carrinho: `GET/POST/PUT/DELETE /api/carrinho`
  - Pedidos: `POST/GET /api/pedidos`, `GET /api/pedidos/:id`, `PUT /api/pedidos/:id/cancelar`
  - Contactos: `POST /api/contactos`, `GET /api/contactos` (auth)
