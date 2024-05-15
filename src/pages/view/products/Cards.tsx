import { useEffect, useContext } from "react";
import { Col, Card, CardImg } from "react-bootstrap";
import { ControllersContext } from "../Context";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
const Cards = () => {
  const { data, getData } = useContext(ControllersContext);

  useEffect(() => {
    getData();
  }, []);

  const imageURL = "http://localhost:3500/uploads/";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };
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
            <Card key={item._id}>
              <NavLink to={`producto/${item._id}`}>
                <CardImg
                  variant="top"
                  src={`${imageURL}${item.image}`}
                  style={{
                    maxHeight: "18em",
                    height: "18em",
                    objectFit: "cover",
                  }}
                ></CardImg>
              </NavLink>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{`Q. ${item.price}`}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </>
  );
};

export default Cards;
