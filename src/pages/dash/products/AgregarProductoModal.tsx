import { useState, useContext } from "react";
import {
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { ControllersContext } from "../Context";
import axios from "../../../api/axios";
const AgregarProductoModal = () => {
  // Importes del contexto
  const { mostrarAgregar, getData, handleOcultarAgregar } =
    useContext(ControllersContext);

  // datos del producto
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);

  const addProduct = async () => {
    try {
      const formData = new FormData(); // Use FormData for multipart uploads
      formData.append("name", producto);
      formData.append("description", descripcion);
      formData.append("price", precio);
      // Handle image upload if file is selected
      if (imagen) {
        formData.append("image", imagen);
      } else {
        console.warn("No image selected for upload."); // Inform user
      }

      const response = await axios.post("/producto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
        getData();
        // Handle successful creation (e.g., close modal, show success message)
      }
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message to user)
    }
    setProducto("");
    setDescripcion("");
    setPrecio("");
    setImagen(null);
    handleOcultarAgregar();
    getData();
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
                name="image"
                autoComplete="off"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addProduct}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgregarProductoModal;
