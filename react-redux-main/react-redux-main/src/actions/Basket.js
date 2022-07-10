import {
  ADD_DATATOBASKET,
  VIEW_DATATOBASKET,
  CLEAR_BASKET,
  INCREASE_TO_BASKET_PRODUCT,
} from "../action-types";

const addDataToBasket = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATATOBASKET,
      payload: product,
    });
  };
};
const increaseToBasketProduct = (name, qty, price, variant, extras) => {
  return {
    type: INCREASE_TO_BASKET_PRODUCT,
    payload: { name, qty, price, variant, extras },
  };
};
const viewDataToBasket = (price) => {
  return (dispatch) => {
    dispatch({
      type: VIEW_DATATOBASKET,
      payload: price,
    });
  };
};
const clearBasket = () => {
  return {
    type: CLEAR_BASKET,
  };
};

export default {
  addDataToBasket,
  viewDataToBasket,
  clearBasket,
  increaseToBasketProduct,
};
