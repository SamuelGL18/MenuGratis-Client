import { Navbar as NavBar, Nav, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useQuery, useQueryClient } from "react-query";

const NavbarPrivado = () => {
  //* Informacion del usuario
  //* Haciendo fetch
  const queryClient = useQueryClient();
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

  const irA = useNavigate();
  const verCarrito = () => {
    if (!datosUsuario?.nombreUsuario) {
      alert("Debes iniciar sesion");
    } else {
      irA("/perfil/carrito");
    }
  };

  const regresar = () => {
    irA("/");
  };

  const cerrarSesion = async () => {
    await axios.get("/cerrarSecion", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    irA("/");
    queryClient.invalidateQueries(["datosUsuario"]);
  };

  const verPedidosHechos = () => {
    if (!datosUsuario?.nombreUsuario) {
      alert("Debes iniciar sesion");
    } else {
      irA("/perfil/pedidosHechos");
    }
  };

  const menuPrincipal = () => {
    irA("/perfil");
  };

  const verPedidosRecividos = () => {
    if (!datosUsuario?.nombreUsuario) {
      alert("Debes iniciar sesion");
    } else {
      irA("/perfil/pedidosRecividos");
    }
  };
  return (
    <>
      <NavBar
        expand="lg"
        className="shadow  bg-primary-subtle ps-4 flex-column d-flex"
      >
        <Nav className=" d-flex justify-content-start">
          <NavBar.Brand>
            <Button variant="transparent" onClick={menuPrincipal}>
              <Image src="/shop.png" alt="Logo" width="30" height="30" />
              Tienda
            </Button>
          </NavBar.Brand>
          <NavBar.Brand>
            <Button variant="transparent" onClick={regresar}>
              <Image src="/wizard.png" alt="Perfil" width="30" height="30" />
            </Button>
          </NavBar.Brand>
          <NavBar.Brand>
            <Button variant="transparent" onClick={verCarrito}>
              <Image src="/shopping-cart.png" width="30" height="30" />
            </Button>
          </NavBar.Brand>
          <NavBar.Brand>
            <Button variant="transparent" onClick={verPedidosHechos}>
              <Image src="/tracking.png" width="30" height="30" />
            </Button>
          </NavBar.Brand>
          <NavBar.Brand>
            <Button variant="transparent" onClick={verPedidosRecividos}>
              <Image src="/notification.png" width="30" height="30" />
            </Button>
          </NavBar.Brand>
          <Link to={"/"} className="nav-link p-text-style">
            <Button
              variant="transparent"
              onClick={cerrarSesion}
              className="nav-link p-text-style"
            >
              Cerrar Sesion
            </Button>
          </Link>
        </Nav>
      </NavBar>
    </>
  );
};

export default NavbarPrivado;
