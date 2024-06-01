import React, { useState } from "react";
import axios from "../../api/axios";
import { useQuery } from "react-query";

const ControladoresContexto = React.createContext({});
// @ts-expect-error Funciona asi nomas papito
const ControllersProvider = ({ children }) => {
  //* Informacion del usuario
  //* Haciendo fetch
  const getDatosUsuario = async () => {
    try {
      const respuesta = await axios.get("/usuario", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (respuesta.data) {
        return respuesta.data;
      }
    } catch (error) {
      console.error(
        "Hubo un error al tratar de obtener la informacion del usuario:",
        error
      );
    }
  };

  //* Utilidades
  const {
    isLoading,
    data: datosUsuario,
    refetch,
  } = useQuery("datosUsuario", getDatosUsuario);

  //* Establecer que productos se van a mostrar
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const seleccionarProductos = () => {
    setProductos(
      categoria
        ? datosUsuario.mercancias.filter(
            // @ts-expect-error Funciona asi nomas papito
            (producto) => producto.categoria == categoria
          )
        : datosUsuario.mercancias
    );
  };
  // @ts-expect-error Funciona asi nomas papito
  const cambiarCategoria = (nuevaCategoria) => {
    console.log(`${nuevaCategoria}
    `);
    setCategoria(nuevaCategoria);
  };

  //* MODALES
  //* Controladores del agregar producto modal
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const handleMostrarAgregar = () => {
    setMostrarAgregar(true);
  };
  const handleOcultarAgregar = () => setMostrarAgregar(false);

  //* Controladores del editar producto modal
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const handleMostarEditor = () => {
    setMostrarEditor(true);
  };
  const handleOcultarEditor = () => setMostrarEditor(false);

  //* Controladores del eliminar producto modal
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const handleMostarEliminar = () => setMostrarEliminar(true);
  const handleOcultarEliminar = () => setMostrarEliminar(false);

  const value = {
    mostrarAgregar,
    handleMostrarAgregar,
    handleOcultarAgregar,
    mostrarEditor,
    handleMostarEditor,
    handleOcultarEditor,
    mostrarEliminar,
    handleMostarEliminar,
    handleOcultarEliminar,
    datosUsuario,
    isLoading,
    productos,
    cambiarCategoria,
    seleccionarProductos,
    categoria,
    refetch,
  };

  return (
    <ControladoresContexto.Provider value={value}>
      {children}
    </ControladoresContexto.Provider>
  );
};

export { ControladoresContexto, ControllersProvider };
