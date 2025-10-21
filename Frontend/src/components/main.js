import "@fortawesome/fontawesome-free/css/all.min.css";
<Route path="/produtos/:slug" element={<ProdutoDetalhe />} />
import Pedidos from "./pages/Pedidos";

<Route path="/pedidos" element={<Pedidos />} />
import PedidoDetalhe from "./pages/PedidoDetalhe";

<Route path="/pedidos/:id" element={<PedidoDetalhe />} />
