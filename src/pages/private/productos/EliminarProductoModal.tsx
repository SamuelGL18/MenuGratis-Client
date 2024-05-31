import { useContext } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { ControladoresContexto } from "../Contexto";
import axios from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";

const EliminarProductoModal = () => {
  // @ts-expect-error Funciona asi nomas papito
  const { mostrarEliminar, handleOcultarEliminar } = useContext(
    ControladoresContexto
  );
  const { idproducto } = useParams();
  const irA = useNavigate();
  const queryClient = useQueryClient();
  // @ts-expect-error Funciona asi nomas papito
  const eliminarProductoAPI = async ({ idproducto }) => {
    try {
      const respuesta = await axios.delete(`/producto/${idproducto}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (respuesta.data) {
        return respuesta;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const regresar = () => {
    irA("/perfil");
    handleOcultarEliminar();
  };

  const eliminarProductoMutation = useMutation(eliminarProductoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("datosUsuario");
      regresar();
    },
  });

  const eliminarProducto = () => {
    eliminarProductoMutation.mutate({ idproducto });
  };

  return (
    <>
      <Modal show={mostrarEliminar} onHide={handleOcultarEliminar} centered>
        <Modal.Header closeButton onClick={regresar}>
          <Modal.Title>
            <h1>¿Desea elimar el producto?</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="me-5" onClick={eliminarProducto}>
            {!eliminarProductoMutation.isLoading ? (
              "Si"
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
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
