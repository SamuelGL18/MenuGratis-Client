import { useContext, useEffect } from "react";
import { ControllersContext } from "../Context";
import { Row, Button } from "react-bootstrap";

const Carrito = () => {
  const { data, getData, cart } = useContext(ControllersContext);
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
