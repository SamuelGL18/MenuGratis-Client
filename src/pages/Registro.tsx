import { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Container,
  Row,
  Col,
  FormText,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Registro = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [usuarioValido, setUsuarioValido] = useState(false);
  const [errorUsuario, setErrorUsuario] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValida, setPasswordValida] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    const setError = async () => {
      const USUARIO_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
      let error = "";
      const lengthUsuario = usuario.length;
      if (lengthUsuario < 4) {
        error = "*El usuario debe tener al menos 4 caracteres";
      } else if (lengthUsuario > 24) {
        error = "*El usuario debe tener maximo 24 caracteres";
      } else if (!USUARIO_REGEX.test(usuario)) {
        error = "*Solo se permiten mayusculas, minusculas, numeros, -, _ ";
      }

      // * fetch data
      try {
        const response = await axios.post(
          "/verifyDuplication",
          JSON.stringify({ username: usuario }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.data === 409) {
          error = "*Este usuario ya existe";
        }
      } catch (error) {
        console.log(error);
      }
      setUsuarioValido(error === "");
      setErrorUsuario(error);
    };
    setError();
  }, [usuario]);

  useEffect(() => {
    const setError = () => {
      const CONTRA_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])([a-zA-Z0-9!@#$%]{8,24})$/;
      let error = "";
      const passwordLength = password.length;
      if (passwordLength < 9) {
        error = "*La contraseña debe tener al menos 9 caracteres";
      } else if (passwordLength > 25) {
        error = "*La contraseña no puede contener mas de 25 caracteres";
      } else if (!CONTRA_REGEX.test(password)) {
        error =
          "*La contraseña debe conterner mayusculas, minusculas, numeros, y caracteres especiales (!@#$%)";
      }
      setPasswordValida(error === "");
      setErrorPassword(error);
    };
    setError();
  }, [password]);

  const enviar = async () => {
    // * fetch data

    try {
      const response = await axios.post(
        "/register",
        {
          username: usuario,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        try {
          const response = await axios.post(
            "/auth",
            JSON.stringify({ username: usuario, password }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          if (response.data) navigate(`/perfil`);
        } catch (error) {
          console.error("Error checking username:", error); // Set user-friendly error message
        }
      }
    } catch (error) {
      console.error("Error sending registration request:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center flex-fill align-items-center">
        <Col>
          <h2 className="text-center">Registrarse</h2>
        </Col>
        <Col>
          <Form onSubmit={enviar}>
            <FormGroup>
              <FormLabel>Usuario</FormLabel>
              <FormControl
                isInvalid={!usuarioValido}
                required
                type="text"
                className="mb-2"
                id="usuario"
                autoComplete="off"
                onChange={(e) => {
                  setUsuario(e.target.value);
                }}
              />
              {errorUsuario && (
                <FormText className="text-muted">{errorUsuario}</FormText>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Contraseña</FormLabel>
              <FormControl
                isInvalid={!passwordValida}
                required
                className="mb-2"
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errorPassword && (
                <FormText className="text-muted">{errorPassword}</FormText>
              )}
            </FormGroup>
            <Form.Check
              type="checkbox"
              label="Mantener sesion"
              className="mb-3 mt-2"
            />
            <Button
              variant="primary"
              className="w-100"
              disabled={!usuarioValido || !passwordValida ? true : false}
              onClick={enviar}
            >
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
