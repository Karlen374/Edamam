import Grid from '@mui/material/Grid';
import { useTransition, animated } from 'react-spring';
import { IRecipe } from 'src/types/IRecipe';
import FoodItem from './foodItem/foodItem';
import styles from './foodList.module.scss';

interface FoodListProps{
  foodsData:IRecipe[]
}

const FoodList = ({ foodsData }:FoodListProps) => {
  const transitions = useTransition(foodsData, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    key: (item:IRecipe) => item.recipeId,
  });

  return (
    <div className={styles.Food_List}>
      <Grid container spacing={3}>
        <div className="css-zow5z4-MuiGrid-root">
          {transitions(({ opacity }, item) => (
            <Grid item md={6} sm={6} lg={4} xs={12}>
              <animated.div
                style={{
                  opacity: opacity.to({ output: [0.2, 1], range: [0, 1] }),
                  transition: opacity
                    .to(() => 'opacity 100ms ease-in'),
                }}
              >
                <FoodItem
                  key={item?.recipeId}
                  foodData={item}
                />
              </animated.div>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
};
export default FoodList;
