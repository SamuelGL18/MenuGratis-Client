import { Button, Card, Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import PiePagina from "./PiePagina";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "../../api/axios";
const Carrito = () => {
  const queryClient = useQueryClient();
  const imagenURL = "http://localhost:3500/uploads/";

  //* Obteniendo el contendio del carrito
  const getCarrito = async () => {
    try {
      const respuesta = await axios.get("carrito", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return respuesta.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { isLoading, isError, data: carrito } = useQuery("carrito", getCarrito);

  //* Enviando los pedidos
  const enviarPedidosAPI = async () => {
    try {
      const respuesta = await axios.get("/carrito/enviarPedidos", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };

  const enviarPedidosMutation = useMutation(enviarPedidosAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("carrito");
    },
  });

  const enviarPedidos = () => {
    enviarPedidosMutation.mutate();
  };

  return (
    <>
      <div className="bg-dark-subtle min-vh-100 mb-2">
        <Navbar></Navbar>
        {isLoading ? (
          <div className="bg-dark-subtle min-vh-100 d-flex justify-content-center align-items-center">
            <div
              className="spinner-grow"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            ></div>
          </div>
        ) : (
          carrito?.productos?.map((pedidoItem) => (
            <Card className="text-center mt-4 mb-2">
              <Card.Header>{pedidoItem?.producto?.nombre}</Card.Header>
              <Card.Img
                variant="top"
                src={`${imagenURL}${pedidoItem?.producto?.imagen}`}
                style={{
                  maxHeight: "30em",
                  height: "30em",
                  objectFit: "cover",
                }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{`Cantidad: ${pedidoItem?.cantidad} Precio: Q.${pedidoItem?.producto?.precio}`}</Card.Title>
                <Card.Text>{pedidoItem?.descripcion}</Card.Text>
                {/* <Button variant="primary"></Button> */}
                <Card.Text className="display-6">{`Subtotal: ${pedidoItem?.subTotal}`}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{`${pedidoItem?.owner}`}</Card.Footer>
            </Card>
          ))
        )}
        <Container>
          <h3>{`Total de la compra: Q.${carrito?.total}`}</h3>
        </Container>
        {isError && <h1>No se ha encontrado nada</h1>}
        <div className="bg-dark-subtle d-flex justify-content-center align-items-center">
          <Button onClick={enviarPedidos}>Enviar Pedidos</Button>
        </div>
      </div>
      <PiePagina></PiePagina>
    </>
  );
};

export default Carrito;
