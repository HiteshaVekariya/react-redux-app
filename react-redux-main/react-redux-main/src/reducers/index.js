import { combineReducers } from "redux";
import showBasket from "./showBasket";
import showTheData from "./showItem";
import showProducts from "./showProduct";
import lang from "./langReducer";

const Reducer = combineReducers({
  data: showTheData,
  productData: showProducts,
  basket: showBasket,
  lang: lang,
});
export default Reducer;
