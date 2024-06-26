import { Navbar as NavBar, Nav, Image, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useQuery } from "react-query";

const Navbar = () => {
  const { usuario } = useParams();
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

  const { data: datosUsuario, refetch } = useQuery(
    "datosUsuario",
    getDatosUsuario
  );

  const getTienda = async () => {
    try {
      const respuesta = await axios.get(`/tienda/${usuario}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (respuesta.data) {
        return respuesta.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { data: datosOwner } = useQuery("datosOwner", getTienda);

  const irA = useNavigate();
  const verCarrito = () => {
    if (!datosUsuario?.nombreUsuario) {
      alert("Debes iniciar sesion");
    } else {
      irA("/perfil/carrito");
    }
  };

  //* Utilidades
  const regresar = () => {
    irA("/");
  };

  const cerrarSesion = async () => {
    await axios.get("/cerrarSecion", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    irA("/");
    refetch();
  };

  const verPedidosHechos = () => {
    if (!datosUsuario?.nombreUsuario) {
      alert("Debes iniciar sesion");
    } else {
      irA("/perfil/pedidosHechos");
    }
  };

  const menuPrincipal = () => {
    irA(`/ver/${datosOwner?.nombreUsuario}`);
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

export default Navbar;
