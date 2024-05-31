import PiePagina from "./PiePagina";
import CategoriasNavbar from "./CategoriasNavbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ControladoresContexto } from "./Contexto";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";

const VistaPrivadaLayout = () => {
  // @ts-expect-error Funciona asi nomas papito
  const { isLoading, datosUsuario } = useContext(ControladoresContexto);
  return (
    <>
      <div className="bg-dark-subtle min-vh-100">
        <Navbar></Navbar>

        {isLoading ? (
          <div className="bg-dark-subtle min-vh-100 d-flex justify-content-center align-items-center">
            <div
              className="spinner-grow"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            ></div>
          </div>
        ) : (
          <>
            <CategoriasNavbar></CategoriasNavbar>
            <Container>
              <h3 className="mb-3">{`Usuario: ${datosUsuario?.nombreUsuario}`}</h3>
            </Container>
            <Outlet />
          </>
        )}
      </div>
      <PiePagina></PiePagina>
    </>
  );
};

export default VistaPrivadaLayout;
