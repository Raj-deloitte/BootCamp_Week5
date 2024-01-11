// store.js
import { createStore } from "redux";

const initialState = {
  items: [],
};
console.log("from store", initialState);

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
