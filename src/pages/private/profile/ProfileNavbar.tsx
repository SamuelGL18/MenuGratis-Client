import { Navbar, Nav, Button, Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ControllersContext } from "./Context";
import { useContext } from "react";
import axios from "../../../api/axios";
const ProfileNavbar = () => {
  const navigate = useNavigate();
  const { handleShow } = useContext(ControllersContext);
  const cerrarSesion = async () => {
    await axios.get("/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="shadow-sm mb-3 ms-5 me-5 ">
        <Navbar.Brand href="">
          <img
            src="../../public/shop.png"
            alt="Your Logo"
            width="30"
            height="30"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Link to={"profile"} className="nav-link p-text-style">
              Ver pagina
            </Link>
            <NavLink to={""} className="nav-link p-text-style">
              <Button
                variant="transparent"
                onClick={cerrarSesion}
                className="nav-link p-text-style"
              >
                Cerrar Sesion
              </Button>
            </NavLink>
            <Navbar.Brand>
              <Button variant="transparent" onClick={handleShow}>
                <Image src="../../public/user.png" width="30" height="30" />
              </Button>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default ProfileNavbar;
