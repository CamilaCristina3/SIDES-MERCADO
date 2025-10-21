# SIDES Mercado

Frontend em React com rotas e carrinho funcional.

## Como rodar

1. Entre no frontend:
   - `cd SIDES/Frontend`
2. Instale dependências:
   - `npm i`
3. Garanta o roteador instalado:
   - `npm i react-router-dom`
4. Rode em desenvolvimento:
   - `npm run dev`

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

