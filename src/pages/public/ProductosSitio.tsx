import { useQuery } from "react-query";
import axios from "../../api/axios";
import { Card, CardImg, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const ProductosSitio = () => {
  //* Obtener todos los productos
  const getProductos = async () => {
    try {
      const respuesta = await axios.get("/tienda", {
        headers: { "Content-Type": "application/json" },
      });
      return respuesta.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, data: productosSitio } = useQuery(
    "productosSitio",
    getProductos
  );

  const imagenURL = "http://localhost:3500/uploads/";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <>
      {isLoading ? (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <div
            className="spinner-grow"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          ></div>
        </div>
      ) : (
        <>
          <h3 className="mb-3">Productos de nuestros usuarios</h3>
          {productosSitio?.map((tienda) =>
            tienda.mercancias.map((producto) => (
              <Col xs={12} md={4} lg={3} xl={3} className="mb-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Card key={producto?._id}>
                    <NavLink
                      to={`/ver/${tienda?.nombreUsuario}/producto/${producto?._id}`}
                    >
                      <CardImg
                        variant="top"
                        src={`${imagenURL}${producto?.imagen}`}
                        style={{
                          maxHeight: "18em",
                          height: "18em",
                          objectFit: "cover",
                        }}
                      ></CardImg>
                    </NavLink>
                    <Card.Body>
                      <Card.Title>{producto?.nombre}</Card.Title>
                      <Card.Text>{`Q. ${producto?.precio}`}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          )}
        </>
      )}
    </>
  );
};

export default ProductosSitio;
