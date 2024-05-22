import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const irA = useNavigate();
  // useEffect(() => {
  //   irA("/404");
  // }, []);
  const regresarAInicio = () => {
    irA("/");
  };
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <h1 className="me-3">😢 Sorry, no existe</h1>
        <div>
          <Button onClick={regresarAInicio}>Regresar a pagina principal</Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
