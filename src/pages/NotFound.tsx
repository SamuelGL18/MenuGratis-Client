import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/404");
  }, []);
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <h1 className="me-3">😢 Sorry, no existe</h1>
        <div>
          <Button onClick={handleClick}>Regresar a pagina principal</Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
