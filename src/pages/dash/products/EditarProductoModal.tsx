import { useState, useContext, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

const EditarProductoModal = () => {
  // Importes del contexto
  const { mostrarEditor, handleOcultarEditor } = useContext(ControllersContext);
  const { idproducto } = useParams();

  const navigate = useNavigate();

  // datos del producto
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  // const [imagen, setImagen] = useState(null);

  // Obteniendo datos antiguos

  const getProducto = async () => {
    try {
      const response = await axios.get(`/producto/${idproducto}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data) {
        setNuevoProducto(response.data.name);
        setNuevaDescripcion(response.data.description);
        setNuevoPrecio(response.data.price);
      }
    } catch (error) {
      console.error(
        "Hubo un error al tratar de obtener la informacion del producto:",
        error
      );
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  const actualizarProducto = async () => {
    try {
      // const formData = new FormData(); // Use FormData for multipart uploads
      // formData.append("name", nuevoProducto);
      // formData.append("description", nuevaDescripcion);
      // formData.append("price", nuevoPrecio);
      // Handle image upload if file is selected
      // if (imagen) {
      //   formData.append("image", imagen);
      // } else {
      //   console.warn("No image selected for upload."); // Inform user
      // }

      const response = await axios.patch(
        `/producto/${idproducto}`,
        JSON.stringify({
          name: nuevoProducto,
          description: nuevaDescripcion,
          price: nuevoPrecio,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log(response.data);
        // Handle successful creation (e.g., close modal, show success message)
      }
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message to user)
    }
    setNuevoProducto("");
    setNuevaDescripcion("");
    setNuevoPrecio("");
    navigate("/perfil");
    // setImagen(null);
    handleOcultarEditor();
  };

  return (
    <>
      <Modal show={mostrarEditor} onHide={handleOcultarEditor} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Editar Producto</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl
                required
                type="text"
                className="mb-2"
                id="producto"
                autoComplete="off"
                value={nuevoProducto}
                onChange={(e) => {
                  setNuevoProducto(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Descripción</FormLabel>
              <FormControl
                required
                as="textarea"
                className="mb-2"
                id="descripcion"
                autoComplete="off"
                value={nuevaDescripcion}
                onChange={(e) => {
                  setNuevaDescripcion(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Precio</FormLabel>
              <FormControl
                required
                type="number"
                className="mb-2"
                id="precio"
                autoComplete="off"
                value={nuevoPrecio}
                onChange={(e) => {
                  setNuevoPrecio(e.target.value);
                }}
              />
            </FormGroup>
            {/* <FormGroup>
              <FormLabel>Imágen</FormLabel>
              <FormControl
                required
                type="file"
                className="mb-2"
                id="imagen"
                name="image"
                autoComplete="off"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </FormGroup> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={actualizarProducto}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarProductoModal;
