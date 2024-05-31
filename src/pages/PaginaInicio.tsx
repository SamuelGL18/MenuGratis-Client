import MenuGratisNavbar from "../components/MenuGratisNavbar";
import { Container, Row } from "react-bootstrap";
import ProductosSitio from "./public/ProductosSitio";
const PaginaInicio = () => {
  return (
    <>
      <MenuGratisNavbar></MenuGratisNavbar>
      <Container>
        <Row>
          <ProductosSitio></ProductosSitio>
        </Row>
      </Container>
    </>
  );
};

export default PaginaInicio;
