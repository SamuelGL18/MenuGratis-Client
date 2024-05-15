import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ControllersContext = React.createContext({});

const ControllersProvider = ({ children }) => {
  const navigate = useNavigate();

  // datos del agregar producto modal
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const handleMostrarAgregar = () => {
    setMostrarAgregar(true);
  };
  const handleOcultarAgregar = () => setMostrarAgregar(false);

  // datos del editar producto modal
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const handleMostarEditor = () => {
    setMostrarEditor(true);
  };
  const handleOcultarEditor = () => setMostrarEditor(false);

  // datos del eliminar producto modal
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const handleMostarEliminar = () => setMostrarEliminar(true);
  const handleOcultarEliminar = () => setMostrarEliminar(false);
  // informacion del usuario
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get("/usuario", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      navigate("/");
      console.error(
        "Hubo un error al tratar de obtener la informacion del usuario:",
        error
      );
    }
  };

  const value = {
    mostrarAgregar,
    handleMostrarAgregar,
    handleOcultarAgregar,
    data,
    setData,
    getData,
    mostrarEditor,
    handleMostarEditor,
    handleOcultarEditor,
    mostrarEliminar,
    handleMostarEliminar,
    handleOcultarEliminar,
  };

  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
};

export { ControllersContext, ControllersProvider };
