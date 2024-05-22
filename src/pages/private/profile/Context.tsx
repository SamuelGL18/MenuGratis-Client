import React from "react";
import { useState } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
const ControllersContext = React.createContext({});

const ControllersProvider = ({ children }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const response = await axios.get("/getUser", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/");
    }
  };

  const value = { show, handleShow, handleHide, data, getData };
  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
};

export { ControllersContext, ControllersProvider };
