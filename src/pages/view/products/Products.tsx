import { Container, Row } from "react-bootstrap";
import Cards from "./Cards";
import { motion } from "framer-motion";

const PublicProducts = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate to full opacity
      exit={{ opacity: 0 }} // Animate on exit
      transition={{ duration: 1.1 }} // Customize transition
    >
      <Container>
        <Row>
          <Cards></Cards>
        </Row>
      </Container>
    </motion.div>
  );
};

export default PublicProducts;
