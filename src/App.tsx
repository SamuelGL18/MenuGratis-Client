import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import VistaPrivada from "./pages/private/VistaPrivada";
import PaginaInicio from "./pages/PaginaInicio";
import Productos from "./pages/private/productos/Productos";
import VistaPublica from "./pages/public/VistaPublica";
import ProductosPublicos from "./pages/public/productos/Productos";
import NotFound from "./pages/NotFound";
import Producto from "./pages/public/productos/Producto";
import Carrito from "./pages/private/Carrito";
import AgregarProductoModal from "./pages/private/productos/AgregarProductoModal";
import EditarProductoModal from "./pages/private/productos/EditarProductoModal";
import EliminarProductoModal from "./pages/private/productos/EliminarProductoModal";
import PedidosHechos from "./pages/private/PedidosHechos";
import PedidosRecividos from "./pages/private/PedidosRecividos";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<PaginaInicio />} />
        <Route path="registro" element={<Registro />} />
        <Route path="login" element={<Login />} />

        <Route path="ver/:usuario" element={<VistaPublica />}>
          <Route index element={<ProductosPublicos />} />
        </Route>
        <Route
          path="ver/:usuario/producto/:idproducto"
          element={<Producto />}
        />

        <Route path="perfil" element={<VistaPrivada />}>
          <Route index element={<Productos />} />
          <Route
            path="producto/:idproducto"
            element={<AgregarProductoModal />}
          />
          <Route
            path="producto/editar/:idproducto"
            element={<EditarProductoModal />}
          />
          <Route
            path="producto/eliminar/:idproducto"
            element={<EliminarProductoModal />}
          />
        </Route>
        <Route path="perfil/carrito" element={<Carrito />} />
        <Route path="perfil/pedidosHechos" element={<PedidosHechos />} />
        <Route path="perfil/pedidosRecividos" element={<PedidosRecividos />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
