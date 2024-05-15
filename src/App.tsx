import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PrivateView from "./pages/dash/PrivateView";
import HomePage from "./pages/HomePage";
import Products from "./pages/dash/products/Products";
import About from "./pages/dash/about/About";
import PublicView from "./pages/view/PublicView";
import PublicProducts from "./pages/view/products/Products";
import NotFound from "./pages/NotFound";
import Producto from "./pages/view/products/Producto";
import Carrito from "./pages/dash/products/Carrito";
import AddModal from "./pages/dash/products/AgregarProductoModal";
import EditarProductoModal from "./pages/dash/products/EditarProductoModal";
import EliminarProductoModal from "./pages/dash/products/EliminarProductoModal";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="registro" element={<Registro />} />
        <Route path="login" element={<Login />} />

        <Route path="ver/:id" element={<PublicView />}>
          <Route index element={<PublicProducts />} />
          <Route path="nosotros" element={<About />} />
          <Route path="producto/:idproducto" element={<Producto />} />
        </Route>

        <Route path="perfil" element={<PrivateView />}>
          <Route index element={<Products />} />
          <Route path="producto/:idproducto" element={<AddModal />} />
          <Route
            path="producto/editar/:idproducto"
            element={<EditarProductoModal />}
          />
          <Route
            path="producto/eliminar/:idproducto"
            element={<EliminarProductoModal />}
          />
          <Route path="nosotros" element={<About />} />
          <Route path="carrito" element={<Carrito />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
