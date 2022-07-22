export const ENDPOINT_COCKTAIL = 'https://www.thecocktaildb.com/api.php';
// const ENDPOINT_MEAL = 'https://www.themealdb.com/api.php';
let storageItens;

export const recipesInProgressStruture = {
  cocktails: {},
  meals: {},
};

export const getAPI = async (url) => {
  try {
    const response = await fetch(url);
    const dataAPI = await response.json();
    return dataAPI;
  } catch (e) {
    console.log(e);
  }
};

const updateStorage = (array, value) => {
  if (array === undefined) {
    return [value.innerText];
  }
  if (array.includes(value.innerText)) {
    return array.filter((ingre) => ingre !== value.innerText);
  }
  return [...array, value.innerText];
};

export const saveIngredient = (value, path, id) => {
  storageItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (path.includes('/foods')) {
    const arrayFoodsAux = storageItens.meals[id];
    const newFoodsArray = updateStorage(arrayFoodsAux, value);
    const newFoodsStorage = {
      ...storageItens,
      meals: {
        ...storageItens.meals,
        [id]: newFoodsArray,
      },
    };
    console.log(newFoodsArray);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newFoodsStorage));
  } else {
    const arrayDrinksAux = storageItens.cocktails[id];
    const newDrinksArray = updateStorage(arrayDrinksAux, value);
    const newDrinksStorage = {
      ...storageItens,
      cocktails: {
        ...storageItens.cocktails,
        [id]: newDrinksArray,
      },
    };
    console.log(newDrinksArray);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newDrinksStorage));
  }
};
