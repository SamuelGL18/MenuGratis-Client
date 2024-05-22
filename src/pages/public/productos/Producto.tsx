import { useState } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { useQuery } from "react-query";
import PiePagina from "../PiePagina";
import Navbar from "../../../components/Navbar";

const Producto = () => {
  const { usuario, idproducto } = useParams();
  const imagenURL = "http://localhost:3500/uploads/";
  const [cantidad, setCantidad] = useState(1);

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

  const agregarAlCarrito = () => {
    setCantidad(cantidad + 1);
  };

  const restarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const enviarAlCarrito = async () => {
    try {
      const response = await axios.post(
        "/agregarAlCarrito",
        JSON.stringify({
          userId: userData?._id,
          total: producto?.price * cantidad,
          productId: producto._id,
          quantity: cantidad,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("echo");
      }
    } catch (error) {
      console.error("Error checking username:", error); // Set user-friendly error message
    }
  };

  const test = () => {
    handleAddItem({
      userId: userData?._id,
      total: producto?.price * cantidad,
      productId: producto._id,
      quantity: cantidad,
    });
    console.log(cart);
  };
  return (
    <>
      <div className="bg-dark-subtle min-vh-100">
        <Navbar></Navbar>
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
                      onClick={agregarAlCarrito}
                    >
                      +
                    </Button>
                  </div>
                  <div style={{ width: "100%" }}>
                    <h2 className="mx-auto text-center">{cantidad}</h2>
                  </div>
                  <div style={{ width: "100%" }} onClick={restarCantidad}>
                    <Button style={{ width: "100%" }}>-</Button>
                  </div>
                </div>
              </Row>
            </Col>
            <Col>
              <Button style={{ width: "100%" }} onClick={test}>
                Agregar al carrito
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <PiePagina></PiePagina>
    </>
  );
};

export default Producto;
