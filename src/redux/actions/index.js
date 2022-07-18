export const ADD_RECIPE_FOODS = 'ADD_RECIPE_FOODS';
export const ADD_RECIPE_DRINKS = 'ADD_RECIPE_DRINKS';

export const addRecipeFoods = (data) => ({
  type: ADD_RECIPE_FOODS,
  payload: data,
});

export const addRecipeDrinks = (data) => ({
  type: ADD_RECIPE_DRINKS,
  payload: data,
});
