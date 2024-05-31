import { useState, useContext } from "react";
import {
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { ControladoresContexto } from "../Contexto";
import axios from "../../../api/axios";
import { useMutation, useQueryClient } from "react-query";

const AgregarProductoModal = () => {
  const queryClient = useQueryClient();
  // Importes del contexto
  // @ts-expect-error Funciona asi nomas papito
  const { mostrarAgregar, handleOcultarAgregar } = useContext(
    ControladoresContexto
  );

  // Datos del producto
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [categoria, setCategoria] = useState("");

  //* Posteo del producto
  // @ts-expect-error Funciona asi nomas papito
  const agregarProductoAPI = async (formData) => {
    try {
      const respuesta = await axios.post("/producto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoMutation = useMutation(agregarProductoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("datosUsuario");
      setProducto("");
      setDescripcion("");
      setPrecio("");
      setImagen(null);
      handleOcultarAgregar();
    },
  });

  const crearProducto = async () => {
    const formData = new FormData(); // Use FormData for multipart uploads
    formData.append("nombre", producto);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("categoria", categoria);
    // Handle image upload if file is selected
    if (imagen) {
      await formData.append("imagen", imagen);
    } else {
      console.warn("No se ha seleccionado la foto del producto."); // Inform user
    }
    console.log(formData);
    agregarProductoMutation.mutate(formData);
  };

  return (
    <>
      <Modal show={mostrarAgregar} onHide={handleOcultarAgregar} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Añadir Producto</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                required
                type="text"
                className="mb-2"
                id="producto"
                autoComplete="off"
                onChange={(e) => {
                  setProducto(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Descripción</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                required
                as="textarea"
                className="mb-2"
                id="descripcion"
                autoComplete="off"
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Precio</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                required
                type="number"
                className="mb-2"
                id="precio"
                autoComplete="off"
                onChange={(e) => {
                  setPrecio(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Imágen</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                required
                type="file"
                className="mb-2"
                id="imagen"
                name="imagen"
                autoComplete="off"
                // @ts-expect-error Funciona asi nomas papito
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Categoria</FormLabel>
              <FormControl
                required
                type="text"
                className="mb-2"
                id="categoria"
                autoComplete="off"
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value);
                }}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={crearProducto}>
            {!agregarProductoMutation.isLoading ? (
              "Agregar"
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgregarProductoModal;
