const CalorieCounter = (age:number, Gender:string, Calories: number) => {
  let allowableNumberCalories = 0;
  if (Gender === 'Male') {
    if (age >= 18 && age <= 30) allowableNumberCalories = 2600;
    if (age > 30 && age <= 50) allowableNumberCalories = 2400;
    if (age > 50) allowableNumberCalories = 2150;
  } else {
    if (age >= 18 && age <= 30) allowableNumberCalories = 2200;
    if (age > 30 && age <= 50) allowableNumberCalories = 2000;
    if (age > 50) allowableNumberCalories = 1800;
  }
  const dailyValue = (100 * Calories) / allowableNumberCalories;
  return Math.round(dailyValue);
};
export default CalorieCounter;
