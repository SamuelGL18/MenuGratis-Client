import SiteNavbar from "../components/SiteNavbar";
import { Container } from "react-bootstrap";
const HomePage = () => {
  return (
    <>
      <SiteNavbar></SiteNavbar>
      <Container>{/* <SiteCarousel></SiteCarousel> */}</Container>
    </>
  );
};

export default HomePage;
