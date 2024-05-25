import { Navbar as NavBar, Nav, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [usuario, setUsuario] = useState("");
  const { tienda } = useParams();
  useEffect(() => {
    setUsuario(tienda);
  }, []);
  useEffect(() => {
    setUsuario(tienda);
  }, [usuario]);
  const irA = useNavigate();
  const verCarrito = () => {
    irA("/perfil/carrito");
  };

  //* Utilidades
  const regresar = () => {
    console.log("ir a perfil");
  };

  const cerrarSesion = async () => {
    await axios.get("/cerrarSecion", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    irA("/");
  };

  const verPedidosHechos = () => {
    irA("/perfil/pedidosHechos");
  };

  const menuPrincipal = () => {
    irA(`/ver/${usuario}`);
  };

  const verPedidosRecividos = () => {
    irA("/perfil/pedidosRecividos");
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
