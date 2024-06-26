import { Navbar, Container, Nav } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "../api/axios";
import { NavLink } from "react-router-dom";

const MenuGratisNavbar = () => {
  //* Informacion del usuario
  //* Haciendo fetch
  const getDatosUsuario = async () => {
    try {
      const respuesta = await axios.get("/usuario", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return respuesta.data;
    } catch (error) {
      console.error(
        "Hubo un error al tratar de obtener la informacion del usuario:",
        error
      );
    }
  };

  //* Utilidades
  const { isLoading, data: datosUsuario } = useQuery(
    "datosUsuario",
    getDatosUsuario
  );

  return (
    <>
      <Navbar expand="lg" className="shadow-sm mb-3">
        <Container>
          <Navbar.Brand href="">
            <img src="/shop.png" alt="Logo" width="30" height="30" />
            Localito
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {isLoading ? (
            <></>
          ) : (
            <>
              {datosUsuario?.nombreUsuario ? (
                <>
                  <Nav className="ms-auto">
                    <NavLink to={`/perfil`} className="nav-link p-text-style">
                      Ver Perfil
                    </NavLink>
                  </Nav>
                </>
              ) : (
                <>
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <NavLink
                        to={"/login"}
                        className={"nav-link p-text-style"}
                      >
                        Iniciar Sesion
                      </NavLink>
                      <NavLink
                        to={"/registro"}
                        className={"nav-link p-text-style"}
                      >
                        Registrarse
                      </NavLink>
                    </Nav>
                  </Navbar.Collapse>
                </>
              )}
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MenuGratisNavbar;
