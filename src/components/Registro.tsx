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

const Registro = () => {
  const USUARIO_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const CONTRA_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])([a-zA-Z0-9!@#$%]{8,24})$/;
  const [usuario, setUsuario] = useState("");
  const [usuarioValido, setUsuarioValido] = useState(false);
  const [errorUsuario, setErrorUsuario] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValida, setPasswordValida] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    const setError = () => {
      let error = "";
      const lengthUsuario = usuario.length;
      if (lengthUsuario < 4) {
        error = "*El usuario debe tener al menos 4 caracteres";
      } else if (lengthUsuario > 24) {
        error = "*El usuario debe tener maximo 24 caracteres";
      } else if (!USUARIO_REGEX.test(usuario)) {
        error = "*Solo se permiten mayusculas, minusculas, numeros, -, _ ";
      }
      setUsuarioValido(error === "");
      setErrorUsuario(error);
    };
    setError();
  }, [usuario]);

  useEffect(() => {
    const setError = () => {
      let error = "";
      let passwordLength = password.length;
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

  const enviar = () => {
    
  }
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center flex-fill align-items-center">
        <Col>
          <h2 className="text-center">Iniciar Sesion</h2>
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
