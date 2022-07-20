import { combineReducers } from 'redux';
import { ADD_RECIPE_FOODS, ADD_RECIPE_DRINKS, ADD_RECIPE_DETAILS } from '../actions';

// const obj = {
//   idMeal: '52977',
//   strArea: 'Turkish',
//   strCategory: 'Side',
//   strCreativeCommonsConfirmed: null,
//   strDrinkAlternate: null,
//   strImageSource: null,
//   strIngredient1: 'Lentils',
//   strIngredient2: 'Onion',
//   strIngredient3: 'Carrots',
//   strIngredient4: 'Tomato Puree',
//   strIngredient5: 'Cumin',
//   strIngredient6: 'Paprika',
//   strIngredient7: 'Mint',
//   strIngredient8: 'Thyme',
//   strIngredient9: 'Black Pepper',
//   strIngredient10: 'Red Pepper Flakes',
//   strIngredient11: 'Vegetable Stock',
//   strIngredient12: 'Water',
//   strIngredient13: 'Sea Salt',
//   strIngredient14: '',
//   strIngredient15: '',
//   strIngredient16: '',
//   strIngredient17: '',
//   strIngredient18: '',
//   strIngredient19: '',
//   strIngredient20: '',
//   strInstructions: 'Pick through your lentils for any foreign debris,',
//   strMeal: 'Corba',
//   strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   strMeasure1: '1 cup ',
//   strMeasure2: '1 large',
//   strMeasure3: '1 large',
//   strMeasure4: '1 tbs',
//   strMeasure5: '2 tsp',
//   strMeasure6: '1 tsp ',
//   strMeasure7: '1/2 tsp',
//   strMeasure8: '1/2 tsp',
//   strMeasure9: '1/4 tsp',
//   strMeasure10: '1/4 tsp',
//   strMeasure11: '4 cups ',
//   strMeasure12: '1 cup ',
//   strMeasure13: 'Pinch',
//   strMeasure14: ' ',
//   strMeasure15: ' ',
//   strMeasure16: ' ',
//   strMeasure17: ' ',
//   strMeasure18: ' ',
//   strMeasure19: ' ',
//   strMeasure20: ' ',
//   strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
//   strTags: 'Soup',
//   strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
// };

const INITIAL_STATE = {
  foods: [],
  drinks: [],
  details: {},
};

const TWELVE = 12;

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECIPE_FOODS: return {
    ...state,
    foods: action.payload.meals.slice(0, TWELVE),
  };
  case ADD_RECIPE_DRINKS: return {
    ...state,
    drinks: action.payload?.drinks.slice(0, TWELVE),
  };
  case ADD_RECIPE_DETAILS: return {
    ...state,
    details: action.payload,
  };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
