import { useEffect, useContext, useState } from "react";
import { Col, Card, CardImg, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ControllersContext } from "../Context";
import { motion } from "framer-motion";
const Cards = () => {
  const { data, getData, handleMostarEditor, handleMostarEliminar } =
    useContext(ControllersContext);

  useEffect(() => {
    getData();
  }, []);

  const imageURL = "http://localhost:3500/uploads/";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };

  const [showDeleteButtons, setShowDeleteButtons] = useState({});
  const [showEditButtons, setShowEditButtons] = useState({});

  return (
    <>
      {data?.saleItems?.map((item) => (
        <Col xs={12} md={4} lg={3} xl={3} className="mb-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Card
              key={item._id}
              onMouseEnter={() => {
                setShowDeleteButtons({
                  ...showDeleteButtons,
                  [item._id]: true,
                });
                setShowEditButtons({
                  ...showEditButtons,
                  [item._id]: true,
                });
              }}
              onMouseLeave={() => {
                setShowDeleteButtons({
                  ...showDeleteButtons,
                  [item._id]: false,
                });
                setShowEditButtons({
                  ...showEditButtons,
                  [item._id]: false,
                });
              }}
            >
              {/* <NavLink to={`producto/${item._id}`} onClick={handleMostarEditor}> */}
              <CardImg
                variant="top"
                src={`${imageURL}${item.image}`}
                style={{
                  maxHeight: "18em",
                  height: "18em",
                  objectFit: "cover",
                }}
              ></CardImg>
              {/* </NavLink> */}
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{`Q. ${item.price}`}</Card.Text>
                {showDeleteButtons[item._id] && (
                  <NavLink to={`producto/eliminar/${item._id}`}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleMostarEliminar}
                    >
                      Eliminar
                    </Button>
                  </NavLink>
                )}
                {showEditButtons[item._id] && (
                  <NavLink to={`producto/editar/${item._id}`}>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={handleMostarEditor}
                    >
                      Editar
                    </Button>
                  </NavLink>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </>
  );
};

export default Cards;
