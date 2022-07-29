import { useParams } from 'react-router-dom';

const FoodInfo = () => {
  const { foodId } = useParams();
  return (
    <>
      <h3>Work</h3>
      {foodId}
    </>
  );
};
export default FoodInfo;
