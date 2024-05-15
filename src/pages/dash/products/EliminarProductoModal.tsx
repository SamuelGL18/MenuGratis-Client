import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { ControllersContext } from "../Context";
import axios from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EliminarProductoModal = () => {
  const { mostrarEliminar, handleOcultarEliminar } =
    useContext(ControllersContext);
  const { idproducto } = useParams();
  const navigate = useNavigate();

  const eliminarProducto = async () => {
    try {
      const response = await axios.delete(`/producto/${idproducto}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
        // Handle successful creation (e.g., close modal, show success message)
      }
      navigate("/perfil");
      handleOcultarEliminar();
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message to user)
    }
  };
  const regresar = () => {
    navigate("/perfil");
    handleOcultarEliminar();
  };
  return (
    <>
      <Modal show={mostrarEliminar} onHide={handleOcultarEliminar} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>¿Desea elimar el producto?</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="me-5" onClick={eliminarProducto}>
            Si
          </Button>
          <Button className="ms-auto" onClick={regresar}>
            No
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EliminarProductoModal;
