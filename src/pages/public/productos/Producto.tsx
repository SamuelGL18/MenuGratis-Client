import { useState } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { useQuery } from "react-query";
import PiePagina from "../PiePagina";
import Navbar from "../../../components/Navbar";
import { useMutation, useQueryClient } from "react-query";

const Producto = () => {
  const queryClient = useQueryClient();
  const { usuario, idproducto } = useParams();
  const imagenURL = "https://menugratis-server.onrender.com/uploads/";
  const [cantidad, setCantidad] = useState(1);

  //* Fetch el producto
  const getProducto = async () => {
    try {
      const respuesta = await axios.get(
        `/tienda/${usuario}/producto/${idproducto}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (respuesta.data) {
        return respuesta.data;
      }
    } catch (error) {
      console.error(
        "Hubo un error al tratar de obtener la informacion del producto:",
        error
      );
    }
  };
  const { isLoading, data: producto } = useQuery("producto", getProducto);

  //* Carrito
  const agregarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const restarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  //* API carrito
  // @ts-expect-error Funciona asi nomas papito
  const enviarAlCarritoAPI = async (item) => {
    try {
      const respuesta = await axios.post("/carrito", item, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        validateStatus: () => true,
      });
      if (respuesta.status === 201) {
        alert("Hecho");
        return respuesta;
      }
      if (respuesta.status === 401) {
        alert("Debes iniciar secion");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const enviarAlCarritoMutation = useMutation(enviarAlCarritoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("carrito");
    },
  });

  const enviarAlCarrito = () => {
    enviarAlCarritoMutation.mutate({
      owner: usuario,
      productoId: producto?._id,
      cantidad: cantidad,
      precio: producto?.precio,
      subTotal: producto?.precio * cantidad,
    });
  };

  return (
    <>
      <div className="bg-dark-subtle min-vh-100">
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
          <Container>
            <Row>
              <Image src={`${imagenURL}${producto?.imagen}`} fluid></Image>
            </Row>
            <Row>
              <h1>{producto?.nombre}</h1>
              <h2 className="h6">{`Q.${producto?.precio}`}</h2>
              <p>{producto?.descripcion}</p>
            </Row>
            <Row>
              <Col md={5} xxl={4} xs={12} sm={5} className="mb-3">
                <Row>
                  <div className="d-flex justify-content-center">
                    <div style={{ width: "100%" }}>
                      <Button
                        style={{ width: "100%" }}
                        onClick={restarCantidad}
                      >
                        -
                      </Button>
                    </div>
                    <div style={{ width: "100%" }}>
                      <h2 className="mx-auto text-center">{cantidad}</h2>
                    </div>
                    <div style={{ width: "100%" }} onClick={agregarCantidad}>
                      <Button style={{ width: "100%" }}>+</Button>
                    </div>
                  </div>
                </Row>
              </Col>
              <Col>
                <Button style={{ width: "100%" }} onClick={enviarAlCarrito}>
                  Agregar al carrito
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
      <PiePagina></PiePagina>
    </>
  );
};

export default Producto;
