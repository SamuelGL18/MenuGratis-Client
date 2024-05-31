import React, { useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const ControladoresContexto = React.createContext({});
// @ts-expect-error Funciona asi nomas papito
const ControllersProvider = ({ children }) => {
  const { usuario } = useParams();

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
  const { isLoading, data: datosOwner } = useQuery("datosOwner", getTienda);

  //* Establecer que productos se van a mostrar
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const seleccionarProductos = () => {
    setProductos(
      categoria
        ? datosOwner.mercancias.filter(
            // @ts-expect-error Funciona asi nomas papito
            (producto) => producto.categoria == categoria
          )
        : datosOwner.mercancias
    );
  };
  // @ts-expect-error Funciona asi nomas papito
  const cambiarCategoria = (nuevaCategoria) => {
    setCategoria(nuevaCategoria);
  };

  const value = {
    datosOwner,
    isLoading,
    productos,
    categoria,
    cambiarCategoria,
    seleccionarProductos,
  };

  return (
    <ControladoresContexto.Provider value={value}>
      {children}
    </ControladoresContexto.Provider>
  );
};

export { ControladoresContexto, ControllersProvider };
