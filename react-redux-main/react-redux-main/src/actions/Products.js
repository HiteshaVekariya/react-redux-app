import { ADD_PRODUCTDATA, VIEW_PRODUCTDATA } from "../action-types";

const addProductData = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCTDATA,
      payload: product,
    });
  };
};

const viewProductData = (id) => {
  return (dispatch) => {
    dispatch({
      type: VIEW_PRODUCTDATA,
      payload: id,
    });
  };
};
export default { addProductData, viewProductData };
