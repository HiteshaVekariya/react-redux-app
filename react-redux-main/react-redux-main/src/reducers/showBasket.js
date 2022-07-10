import {
  ADD_DATATOBASKET,
  CLEAR_BASKET,
  INCREASE_TO_BASKET_PRODUCT,
} from "../action-types";

const initialState = {
  products: [],
  totalPrice: 0,
};

const showBasket = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATATOBASKET:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case CLEAR_BASKET:
      return {
        products: [],
      };

    case INCREASE_TO_BASKET_PRODUCT:
      return {
        ...state,
        products: state.products.map((prod) => {
          if (
            prod.name == action.payload.name &&
            prod.variant == action.payload.variant &&
            JSON.stringify(prod.extras) == JSON.stringify(action.payload.extras)
          ) {
            return {
              ...prod,
              qty: prod.qty + action.payload.qty,
              totalPrice: prod.totalPrice + action.payload.price,
            };
          } else {
            return prod;
          }
        }),
      };

    default:
      return state;
  }
};

export default showBasket;
