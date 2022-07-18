import { combineReducers } from 'redux';
import { ADD_RECIPE_FOODS, ADD_RECIPE_DRINKS } from '../actions';

const INITIAL_STATE = {
  foods: [],
  drinks: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECIPE_FOODS: return {
    ...state,
    foods: action.payload.meals,
  };
  case ADD_RECIPE_DRINKS: return {
    ...state,
    drinks: action.payload.drinks,
  };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
