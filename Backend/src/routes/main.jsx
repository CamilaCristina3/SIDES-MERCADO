import ProdutoDetalhe from "./pages/ProdutoDetalhe";
// ...
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/produtos" element={<Produtos />} />
  <Route path="/produtos/:slug" element={<ProdutoDetalhe />} />
</Routes>
import Carrinho from "./pages/Carrinho";

<Route path="/carrinho" element={<Carrinho />} />
import Checkout from "./pages/Checkout";

<Route path="/checkout" element={<Checkout />} />
import PedidoDetalhe from "./pages/PedidoDetalhe";

<Route path="/pedidos/:id" element={<PedidoDetalhe />} />
