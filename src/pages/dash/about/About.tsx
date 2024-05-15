import { motion } from "framer-motion";
import { Col, Container, Row, Image } from "react-bootstrap";

const About = () => {
  // const key = "AIzaSyDMCisaVYrNF5I4MzOAiLVeKw-NS1EJFUw";
  // const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 }); // Default coordinates

  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) =>
  //       setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
  //     (error) => console.error(error)
  //   );
  // };
  // const mapContainerStyle = { width: "100%", height: "400px" };
  // const zoom = 10;

  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate to full opacity
      exit={{ opacity: 0 }} // Animate on exit
      transition={{ duration: 1.1 }} // Customize transition
    >
      <Container>
        <h1>Sobre Nosotros</h1>
        <Row className="d-flex align-items-center">
          <Col>
            <Image
              src="https://media.wired.com/photos/60679483e0902d1ea60b511b/16:9/w_2100,h_1181,c_limit/games_indie-shops.jpg"
              fluid
            />
          </Col>
          <Col>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              facere esse corrupti suscipit ipsa, exercitationem impedit vero
              aut eaque, fugit quam alias, animi nobis earum quisquam nam natus
              obcaecati veniam!
            </p>
            <h3>Ubicacion</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit..</p>
          </Col>
        </Row>
        {/* <LoadScript googleMapsApiKey={key}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={zoom}
          >
            <Marker position={position}></Marker>
          </GoogleMap>
        </LoadScript>
        <button onClick={getLocation}>Get My Location</button> */}
      </Container>
    </motion.div>
  );
};
export default About;
