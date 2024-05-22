import Navbar from "../../components/Navbar";
import PiePagina from "./PiePagina";
import CategoriasNavbar from "./CategoriasNavbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ControladoresContexto } from "./Contexto";

const VistaPrivadaLayout = () => {
  const { isLoading } = useContext(ControladoresContexto);
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
            <Outlet />
          </>
        )}
      </div>
      <PiePagina></PiePagina>
    </>
  );
};

export default VistaPrivadaLayout;
