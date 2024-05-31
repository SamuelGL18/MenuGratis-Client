import { Button, Card } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import PiePagina from "../public/PiePagina";
import { useQuery, useQueryClient } from "react-query";
import axios from "../../api/axios";
import NavbarPrivado from "./NavbarPrivado";

const PedidosRecividos = () => {
  // const queryClient = useQueryClient();
  // const imagenURL = "http://localhost:3500/uploads/";

  //* Obteniendo los pedidos
  const getPedidos = async () => {
    try {
      const respuesta = await axios.get("pedidosRecividos", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return respuesta.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    isLoading,
    isError,
    data: pedidosRecividos,
  } = useQuery("pedidosRecividos", getPedidos);

  return (
    <>
      <div className="bg-dark-subtle min-vh-100 mb-2">
        <NavbarPrivado></NavbarPrivado>
        {isLoading ? (
          <div className="bg-dark-subtle min-vh-100 d-flex justify-content-center align-items-center">
            <div
              className="spinner-grow"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            ></div>
          </div>
        ) : (
          pedidosRecividos?.map((pedido) => (
            <Card className="text-center mt-4 mb-2">
              <Card.Header>{`Fecha de Emision: ${pedido?.fechaEmision}`}</Card.Header>
              <Card.Header>{`Cliente: ${pedido?.cliente}`}</Card.Header>

              <Card.Body>
                {pedido?.itemsPedido?.map((producto) => (
                  <>
                    <Card.Text>{producto?.nombre}</Card.Text>
                    <Card.Text className="blockquote">{`Cantidad pedida: ${producto?.cantidad}`}</Card.Text>
                    <Card.Text className="blockquote">{`Subtotal: Q.${producto?.subTotal}`}</Card.Text>
                  </>
                ))}
                <Button variant="primary">Marcar como entregado</Button>
              </Card.Body>
              <Card.Footer className="text-muted">{`Total: Q.${pedido?.total}`}</Card.Footer>
            </Card>
          ))
        )}
        {isError && <h1>No se ha encontrado nada</h1>}
      </div>
      <PiePagina></PiePagina>
    </>
  );
};

export default PedidosRecividos;