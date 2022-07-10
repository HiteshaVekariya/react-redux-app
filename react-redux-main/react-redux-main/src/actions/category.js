import { ADD_DATA, VIEW_DATA } from "../action-types";

const addData = (category) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATA,
      payload: category,
    });
  };
};

const viewData = (id) => {
  return (dispatch) => {
    dispatch({
      type: VIEW_DATA,
      payload: id,
    });
  };
};
export default { addData, viewData };
