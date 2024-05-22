import { Nav } from "react-bootstrap";
import { ControladoresContexto } from "./Contexto";
import { useContext } from "react";

const CategoriasNavbar = () => {
  const { datosUsuario, cambiarCategoria } = useContext(ControladoresContexto);
  return (
    <>
      <Nav
        justify
        variant="tabs"
        defaultActiveKey=""
        className="mb-5 bg-primary-subtle"
      >
        <Nav.Item>
          <Nav.Link eventKey={""} onClick={() => cambiarCategoria("")}>
            Todos los productos
          </Nav.Link>
        </Nav.Item>
        {datosUsuario?.tienda?.categorias?.map((item) => (
          <Nav.Item>
            <Nav.Link eventKey={item} onClick={() => cambiarCategoria(item)}>
              {item}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

export default CategoriasNavbar;
