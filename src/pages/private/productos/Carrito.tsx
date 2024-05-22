import { useContext, useEffect } from "react";
import { ControladoresContexto } from "../Contexto";
import { Row, Button } from "react-bootstrap";

const Carrito = () => {
  const { data, getData, cart } = useContext(ControladoresContexto);
  useEffect(() => {
    getData();
  }, []);
  const getCart = () => {
    console.log(cart);
  };
  return (
    <>
      {/* {data?.ordersMade?.map((item) => (
        <Row>
          <h1>{}</h1>
        </Row>
      ))} */}
      <Button onClick={getCart}></Button>
    </>
  );
};

export default Carrito;
