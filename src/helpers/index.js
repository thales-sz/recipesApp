export const ENDPOINT_COCKTAIL = 'https://www.thecocktaildb.com/api.php';
// const ENDPOINT_MEAL = 'https://www.themealdb.com/api.php';

export const getAPI = async (url) => {
  try {
    console.log(url);
    const response = await fetch('www.thecocktaildb.com/api/json/v1/1/random.php');
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
