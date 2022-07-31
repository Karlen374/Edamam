import { IIngredient } from 'src/types/IIngredient';

const carouselDataCounter = (data:IIngredient[]) => {
  const arr = [];
  for (let i = 0; i < data?.length; i++) {
    arr.push({
      image: `${data[i]?.image}`,
      caption: `${data[i]?.food}`,
    });
  }
  return arr;
};
export default carouselDataCounter;
