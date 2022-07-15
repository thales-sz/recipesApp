export const ENDPOINT_COCKTAIL = 'https://www.thecocktaildb.com/api.php';
// const ENDPOINT_MEAL = 'https://www.themealdb.com/api.php';

export const getAPI = async (url) => {
  try {
    const response = await fetch(url);
    const dataAPI = await response.json();
    return dataAPI;
  } catch (error) {
    throw new Error(error);
  }
};
