import { Navbar, Container, Nav, NavLink } from "react-bootstrap";

const SiteNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="shadow-sm mb-3">
        <Container>
          <Navbar.Brand href="">
            <img
              src="../../public/shop.png"
              alt="Your Logo"
              width="30"
              height="30"
            />
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

export default SiteNavbar;
