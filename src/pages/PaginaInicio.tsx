import MenuGratisNavbar from "../components/MenuGratisNavbar";
import { Container, Row } from "react-bootstrap";
const PaginaInicio = () => {
  return (
    <>
      <MenuGratisNavbar></MenuGratisNavbar>
      <Container>
        <Row>
          <h1>Esta es la pagina de inicio!</h1>
        </Row>
      </Container>
    </>
  );
};

export default PaginaInicio;
