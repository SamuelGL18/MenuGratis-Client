import { Container, Row } from "react-bootstrap";
import AgregarProductoModal from "./AgregarProductoModal";
import CasillaAgregar from "./CasillaAgregar";
import Cards from "./Cards";
import { motion } from "framer-motion";
import EditarProductoModal from "./EditarProductoModal";
import EliminarProductoModal from "./EliminarProductoModal";

const Productos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate to full opacity
      exit={{ opacity: 0 }} // Animate on exit
      transition={{ duration: 1.1 }} // Customize transition
    >
      <Container>
        <Row>
          <CasillaAgregar></CasillaAgregar>
          <Cards></Cards>
        </Row>
        <AgregarProductoModal></AgregarProductoModal>
        <EditarProductoModal></EditarProductoModal>
        <EliminarProductoModal></EliminarProductoModal>
      </Container>
    </motion.div>
  );
};

export default Productos;
