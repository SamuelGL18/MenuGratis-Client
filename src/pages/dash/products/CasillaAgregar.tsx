import { useContext } from "react";
import { Button, Col, Image } from "react-bootstrap";
import { ControllersContext } from "../Context";
import { motion } from "framer-motion";
const CasillaAgregar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };
  const { handleMostrarAgregar } = useContext(ControllersContext);
  return (
    <Col lg={3} className="shadow-sm bg-dark border rounded mb-5">
      <div className="d-flex align-items-center justify-content-center h-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Button variant="transparent" onClick={handleMostrarAgregar}>
            <Image
              src="../../public/add.png"
              fluid
              style={{ maxHeight: "3em" }}
            />
          </Button>
        </motion.div>
      </div>
    </Col>
  );
};

export default CasillaAgregar;
