import { Navbar, Nav, Image, Button, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ToggleContent = () => {
  const navigate = useNavigate();
  const mostrarCart = () => {
    navigate("/perfil/carrito");
  };
  const regresar = () => {
    navigate(`/`);
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="shadow mb-3 bg-primary-subtle ps-4 flex-column d-flex"
      >
        <Nav className=" d-flex justify-content-start">
          <Navbar.Brand>
            <Image
              src="../../public/shop.png"
              alt="Your Logo"
              width="30"
              height="30"
            />
            Tiendita
          </Navbar.Brand>
          <Navbar.Brand>
            <Button variant="transparent" onClick={regresar}>
              <Image
                src="../../public/3d-house.png"
                alt="Your Logo"
                width="30"
                height="30"
              />
            </Button>
          </Navbar.Brand>
          <Navbar.Brand>
            <Button variant="transparent" onClick={mostrarCart}>
              <Image
                src="../../public/shopping-cart.png"
                width="30"
                height="30"
              />
            </Button>
          </Navbar.Brand>
        </Nav>
        <Row className="justify-content-start">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link to={""} className="nav-link p-text-style">
                Productos
              </Link>
              <Link to={"nosotros"} className="nav-link p-text-style">
                Sobre Nosotros
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Row>
      </Navbar>
    </>
  );
};

export default ToggleContent;
