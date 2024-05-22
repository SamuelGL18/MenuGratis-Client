import { useState, useContext } from "react";
import {
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import axios from "../../../api/axios";
import { ControllersContext } from "./Context";
const EditProfileModal = () => {
  const { show, handleHide } = useContext(ControllersContext);
  const [usuario, setUsuario] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [userFacebook, setUserFacebook] = useState("");
  const [userInstagram, setUserInstagram] = useState("");
  const [photo, setPhoto] = useState(null);

  const addProduct = async () => {
    try {
      const formData = new FormData(); // Use FormData for multipart uploads
      formData.append("username", usuario);
      formData.append("location", ubicacion);
      formData.append("facebookProfile", userFacebook);
      formData.append("instagramProfile", userInstagram);

      // Handle image upload if file is selected
      if (photo) {
        formData.append("userPhoto", photo);
      }

      const response = await axios.post("/createCard", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
        // Handle successful creation (e.g., close modal, show success message)
      }
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message to user)
    }
    setUsuario("");
    setUbicacion("");
    setUserFacebook("");
    setUserInstagram("");
    setPhoto(null);
  };
  return (
    <>
      <Modal show={show} onHide={handleHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Editar Perfil</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>Nombre de Usuario</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                required
                type="text"
                className="mb-2"
                id="usuario"
                autoComplete="off"
                onChange={(e) => {
                  setUsuario(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Ubicacion</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                as="textarea"
                className="mb-2"
                id="ubicacion"
                autoComplete="off"
                onChange={(e) => {
                  setUbicacion(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Link de Perfil de Facebook</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                required
                type="text"
                className="mb-2"
                id="userFacebook"
                autoComplete="off"
                onChange={(e) => {
                  setUserFacebook(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Link de Perfil de Instagram</FormLabel>
              <FormControl
                type="text"
                className="mb-2"
                id="userInstagram"
                autoComplete="off"
                onChange={(e) => {
                  setUserInstagram(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Foto</FormLabel>
              <FormControl
                // isInvalid={!usuarioValido}
                type="file"
                className="mb-2"
                id="photo"
                name="userPhoto"
                autoComplete="off"
                onChange={(e) => setPhoto(e.target.files[0])}
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

export default EditProfileModal;
