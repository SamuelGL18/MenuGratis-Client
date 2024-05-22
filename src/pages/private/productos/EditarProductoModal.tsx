import { useState, useContext, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";

const EditarProductoModal = () => {
  // Importes del contexto
  const { mostrarEditor, handleOcultarEditor } = useContext(
    ControladoresContexto
  );
  const { idproducto } = useParams();
  const queryClient = useQueryClient();

  const irA = useNavigate();

  // datos del producto
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  // const [imagen, setImagen] = useState(null);

  //* Obteniendo datos antiguos
  const getProducto = async () => {
    try {
      const response = await axios.get(`/producto/${idproducto}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data) {
        setNuevoProducto(response.data.nombre);
        setNuevaDescripcion(response.data.descripcion);
        setNuevoPrecio(response.data.precio);
        setNuevaCategoria(response.data.categoria);
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

  const actualizarProductoAPI = async (nuevoProducto) => {
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

      const respuesta = await axios.patch(
        `/producto/${idproducto}`,
        nuevoProducto,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (respuesta.data) {
        console.log(respuesta.data);
        return respuesta;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarProductoMutation = useMutation(actualizarProductoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("datosUsuario");
      setNuevoProducto("");
      setNuevaDescripcion("");
      setNuevoPrecio("");
      irA("/perfil");
      // setImagen(null);
      handleOcultarEditor();
    },
  });

  const actualizarProducto = () => {
    actualizarProductoMutation.mutate({
      nombre: nuevoProducto,
      descripcion: nuevaDescripcion,
      precio: nuevoPrecio,
      categoria: nuevaCategoria,
    });
  };

  const regresar = () => {
    handleOcultarEditor();
    irA("/perfil");
  };

  return (
    <>
      <Modal show={mostrarEditor} onHide={handleOcultarEditor} centered>
        <Modal.Header closeButton onClick={regresar}>
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
            <FormGroup>
              <FormLabel>Categoria</FormLabel>
              <FormControl
                required
                type="text"
                className="mb-2"
                id="categoria"
                autoComplete="off"
                value={nuevaCategoria}
                onChange={(e) => {
                  setNuevaCategoria(e.target.value);
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
            {!actualizarProductoMutation.isLoading ? (
              "Actualizar"
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarProductoModal;
