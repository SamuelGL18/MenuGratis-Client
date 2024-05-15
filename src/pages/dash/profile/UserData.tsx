import { useContext, useEffect } from "react";
import { Container, Row, Card, Button, Image } from "react-bootstrap";
import { ControllersContext } from "./Context";

const UserData = () => {
  const { data, getData } = useContext(ControllersContext);

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Row>
        <h3 className="mb-4">{data.username}</h3>
      </Row>
      <Row className="mb-5">
        <h4 className="mb-4">Ordenes por Entregar</h4>
        <Card>
          <Card.Header as="h5">Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <h4 className="mb-4 d-flex align-items-center">
          Ordenes Entregadas{" "}
          <Image
            src="../../../../public/check.png"
            width={30}
            height={30}
            className="ms-3"
          />
        </h4>
        <Card>
          <Card.Header as="h5">Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default UserData;
