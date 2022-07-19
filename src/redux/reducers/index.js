import { combineReducers } from 'redux';
import { ADD_RECIPE_FOODS, ADD_RECIPE_DRINKS } from '../actions';

const INITIAL_STATE = {
  foods: [],
  drinks: [],
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
  default:
    return state;
  }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
