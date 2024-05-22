import { Navbar as NavBar, Nav, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const mostrarCart = () => {
    console.log("dfd");
  };
  const regresar = () => {
    navigate(`/dash/${"d"}`);
  };
  const cerrarSesion = async () => {
    await axios.get("/cerrarSecion", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    navigate("/");
  };
  return (
    <>
      <NavBar
        expand="lg"
        className="shadow  bg-primary-subtle ps-4 flex-column d-flex"
      >
        <Nav className=" d-flex justify-content-start">
          <NavBar.Brand>
            <Image src="/shop.png" alt="Logo" width="30" height="30" />
            Tiendita
          </NavBar.Brand>
          <NavBar.Brand>
            <Button variant="transparent" onClick={regresar}>
              <Image src="/wizard.png" alt="Perfil" width="30" height="30" />
            </Button>
          </NavBar.Brand>
          <NavBar.Brand>
            <Button variant="transparent" onClick={mostrarCart}>
              <Image src="/shopping-cart.png" width="30" height="30" />
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
