import categories from "../Data/Categories.json";
import {ADD_DATA,VIEW_DATA} from "../action-types"
const initialState = {
  categories: categories.categories,
};
const showTheData = (state = initialState, action) => {
  if (action.type === ADD_DATA) {
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  } else if (action.type === VIEW_DATA) {
    return {
      ...state,
      categories: state.categories.filter(
        (showTheData) => showTheData.id !== action.payload
      ),
    };
  } else {
    return state;
  }
};

export default showTheData;
