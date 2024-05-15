import { Carousel, Image } from "react-bootstrap";

const SiteCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          src="http://localhost:3500/uploads/1713414293728-terragod.jpg"
          className="d-block w-100"
          height={500}
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src="http://localhost:3500/uploads/1713414382303-worms.jpg"
          className="d-block w-100"
          height={500}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SiteCarousel;
