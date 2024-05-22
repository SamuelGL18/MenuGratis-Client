import { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ControladoresContexto } from "./Contexto";

const PiePagina = () => {
  const { datosUsuario } = useContext(ControladoresContexto);
  const url = `http://localhost:5173/ver/${datosUsuario?.nombreUsuario}`;
  const obtenerLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {})
      .catch((err) => {
        console.error("No se pudo copiar el texto: ", err);
      });
  };

  return (
    <footer className="bg-primary-subtle py-5">
      <div className="d-flex justify-content-center">
        <NavLink
          className="me-3"
          to={"https://www.instagram.com/j_samuel190/?hl=es-la"}
        >
          <Image src="../../../public/instagram.png" height={30} width={30} />
        </NavLink>
        <NavLink
          className="me-3"
          to={"https://www.facebook.com/profile.php?id=100026046003163"}
        >
          <Image src="../../../public/facebook.png" height={30} width={30} />
        </NavLink>
        <NavLink to={""}>
          <Button
            variant="transparent"
            onClick={obtenerLink}
            className="nav-link p-text-style"
          >
            <Image src="../../../public/link.png" height={30} width={30} />
          </Button>
        </NavLink>
      </div>
    </footer>
  );
};

export default PiePagina;
