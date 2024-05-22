import { Navbar, Container, Nav, NavLink } from "react-bootstrap";

const MenuGratisNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="shadow-sm mb-3">
        <Container>
          <Navbar.Brand href="">
            <img src="/shop.png" alt="Logo" width="30" height="30" />
            Localito
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink href="login">Iniciar Sesion</NavLink>
              <NavLink href="registro">Registrarse</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuGratisNavbar;
