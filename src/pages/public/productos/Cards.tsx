import { useContext, useEffect } from "react";
import { Col, Card, CardImg } from "react-bootstrap";
import { ControladoresContexto } from "../Contexto";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
const Cards = () => {
  // @ts-expect-error Funciona asi nomas papito
  const { productos, categoria, seleccionarProductos } = useContext(
    ControladoresContexto
  );

  const imagenURL = "https://menugratis-server.onrender.com/uploads/";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };

  useEffect(() => {
    seleccionarProductos();
  }, [categoria]);

  useEffect(() => {
    seleccionarProductos();
  }, []);

  return (
    <>
      {
        // @ts-expect-error Funciona asi nomas papito
        productos?.map((item) => (
          <Col xs={12} md={4} lg={3} xl={3} className="mb-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Card key={item._id}>
                <NavLink to={`producto/${item._id}`}>
                  <CardImg
                    variant="top"
                    src={`${imagenURL}${item.imagen}`}
                    style={{
                      maxHeight: "18em",
                      height: "18em",
                      objectFit: "cover",
                    }}
                  ></CardImg>
                </NavLink>
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text>{`Q. ${item.precio}`}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))
      }
    </>
  );
};

export default Cards;
