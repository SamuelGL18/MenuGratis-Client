import { useState } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Login = () => {
  const irA = useNavigate();

  // Datos
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  //* Autorizar al usuario
  const enviar = async () => {
    try {
      const respuesta = await axios.post(
        "/autorizacion",
        { nombreUsuario: usuario, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (respuesta.status === 200) {
        irA(`/perfil`);
      }
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center flex-fill align-items-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Iniciar Sesion</h2>
        </Col>
        <Col xs={12} md={6}>
          <Form onSubmit={enviar}>
            <FormGroup>
              <FormLabel>Usuario</FormLabel>
              <FormControl
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl
                required
                className="mb-2"
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>
            <Form.Check
              type="checkbox"
              label="Mantener sesion"
              className="mb-3 mt-2"
            />
            <Button variant="primary" className="w-100" onClick={enviar}>
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
