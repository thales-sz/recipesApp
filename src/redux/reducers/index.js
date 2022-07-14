import { combineReducers } from 'redux';

const INITIAL_STATE = {
  estado: 'inicial',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
