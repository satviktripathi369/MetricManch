import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css';

const ProductCarousel = (props) => {
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        {/* Render the thumbnail link as text */}
        <Carousel variant="dark" interval={4000}>
          <Carousel.Item>
            <div className="carousel__image__container">
              {/* Use props.thumbnail as the source for the image */}
              <img className="carousel__image" src={props.thumbnail} alt="item" />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default ProductCarousel;
