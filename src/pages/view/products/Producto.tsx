import { useEffect, useState } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

const Producto = () => {
  const { idproducto } = useParams();
  const imageURL = "http://localhost:3500/uploads/";
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState({});
  const getProducto = async () => {
    try {
      const response = await axios.get(`/producto/${idproducto}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data) {
        console.log(response.data);
        setProducto(response.data);
      }
    } catch (error) {
      console.error(
        "Hubo un error al tratar de obtener la informacion del producto:",
        error
      );
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

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
    <Container>
      <Row>
        <Image src={`${imageURL}${producto?.image}`} fluid></Image>
      </Row>
      <Row>
        <h1>{producto?.name}</h1>
        <h2 className="h6">{`Q.${producto?.price}`}</h2>
        <p>{producto?.description}</p>
      </Row>
      <Row>
        <Col md={5} xxl={4} xs={12} sm={5} className="mb-3">
          <Row>
            <div className="d-flex justify-content-center">
              <div style={{ width: "100%" }}>
                <Button style={{ width: "100%" }} onClick={agregarAlCarrito}>
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
  );
};

export default Producto;
