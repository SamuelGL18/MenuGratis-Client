import React, { useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const ControllersContext = React.createContext({});

const ControllersProvider = ({ children }) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(`/pagina/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/getUser", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setUserData(response.data);
      // * For debug
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const value = {
    show,
    handleHide,
    handleShow,
    data,
    setData,
    getData,
    getUser,
    userData,
  };

  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
};

export { ControllersContext, ControllersProvider };
