import { Carousel } from 'react-carousel-minimal';

interface IFoodInfoCarouselProps{
  carouselDataArray:{
    image: string;
    caption: string;
  }[]
}
const FoodInfoCarousel = ({ carouselDataArray }:IFoodInfoCarouselProps) => {
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };
  return (
    <Carousel
      data={carouselDataArray}
      time={5000}
      width="450px"
      height="280px"
      captionStyle={captionStyle}
      radius="20px"
      slideNumber
      slideNumberStyle={slideNumberStyle}
      captionPosition="bottom"
      automatic
      dots
      pauseIconColor="black"
      pauseIconSize="60px"
      slideBackgroundColor="black"
      slideImageFit="cover"
    />
  );
};
export default FoodInfoCarousel;
