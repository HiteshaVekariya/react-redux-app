import products from "../Data/products.json";
import { ADD_PRODUCTDATA, VIEW_PRODUCTDATA } from "../action-types";

const initialState = {
  products: products.products,
};

const showProducts = (state = initialState, action) => {
  if (action.type === ADD_PRODUCTDATA) {
    return {
      ...state,
      products: [...state.products, action.payload],
    };
  } else if (action.type === VIEW_PRODUCTDATA) {
    return {
      ...state,
      products: state.products.filter(
        (showProduct) => showProduct.id !== action.payload
      ),
    };
  } else {
    return state;
  }
};
export default showProducts;
