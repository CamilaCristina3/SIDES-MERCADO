// src/pages/PedidoDetalhe.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config/api";

function PedidoDetalhe() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchPedido() {
      try {
        const res = await fetch(`${API_URL}/pedidos/${id}`);
        const data = await res.json();
        if (data.success) {
          setPedido(data.data);
        } else {
          setPedido(null);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do pedido:", error);
      } finally {
        setCarregando(false);
      }
    }
    fetchPedido();
  }, [id]);

  const getStatusCor = (status) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-700";
      case "enviado":
        return "bg-blue-100 text-blue-700";
      case "entregue":
        return "bg-emerald-100 text-emerald-700";
      case "cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (carregando)
    return <p className="text-center mt-10 text-gray-500">Carregando detalhes...</p>;

  if (!pedido)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">Pedido não encontrado.</p>
        <Link
          to="/pedidos"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Voltar aos pedidos
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalhes do Pedido</h1>
        <Link
          to="/pedidos"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          <i className="fas fa-arrow-left mr-2"></i>Voltar
        </Link>
      </div>

      {/* Cabeçalho do pedido */}
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p>
              <span className="font-medium">Código:</span> {pedido.codigo}
            </p>
            <p>
              <span className="font-medium">Data:</span>{" "}
              {new Date(pedido.data_criacao).toLocaleString("pt-MZ")}
            </p>
            <p>
              <span className="font-medium">Total:</span>{" "}
              <span className="text-green-700 font-semibold">
                {pedido.total.toFixed(2)} MZN
              </span>
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-1 text-sm rounded ${getStatusCor(
                  pedido.status
                )}`}
              >
                {pedido.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Método de Pagamento:</span>{" "}
              {pedido.metodo_pagamento}
            </p>
            <p>
              <span className="font-medium">Transação ID:</span>{" "}
              {pedido.transacao_id || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Endereço de entrega */}
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Endereço de Entrega</h2>
        <p>{pedido.endereco_entrega}</p>
        {pedido.provincia && (
          <p className="text-gray-600">
            {pedido.distrito}, {pedido.provincia}
          </p>
        )}
      </div>

      {/* Itens do pedido */}
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Itens do Pedido</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Produto</th>
                <th className="text-center px-4 py-2">Qtd</th>
                <th className="text-right px-4 py-2">Preço Unit.</th>
                <th className="text-right px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedido.itens &&
                pedido.itens.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        {item.imagem && (
                          <img
                            src={item.imagem}
                            alt={item.nome}
                            className="w-14 h-14 rounded object-cover"
                          />
                        )}
                        <span>{item.nome}</span>
                      </div>
                    </td>
                    <td className="text-center px-4 py-3">{item.quantidade}</td>
                    <td className="text-right px-4 py-3">
                      {item.preco.toFixed(2)} MZN
                    </td>
                    <td className="text-right px-4 py-3 font-semibold">
                      {(item.preco * item.quantidade).toFixed(2)} MZN
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagamento */}
      {pedido.pagamento && (
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-3">Informações de Pagamento</h2>
          <p>
            <span className="font-medium">Método:</span>{" "}
            {pedido.pagamento.metodo_pagamento}
          </p>
          <p>
            <span className="font-medium">Transação ID:</span>{" "}
            {pedido.pagamento.transacao_id}
          </p>
          <p>
            <span className="font-medium">Status do Pagamento:</span>{" "}
            <span
              className={`px-2 py-1 text-sm rounded ${getStatusCor(
                pedido.pagamento.status
              )}`}
            >
              {pedido.pagamento.status}
            </span>
          </p>
          <p>
            <span className="font-medium">Valor Pago:</span>{" "}
            {pedido.pagamento.total.toFixed(2)} MZN
          </p>
          <p className="text-sm text-gray-500">
            Efetuado em:{" "}
            {new Date(pedido.pagamento.data_pagamento).toLocaleString("pt-MZ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default PedidoDetalhe;
