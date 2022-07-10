import { LOCALES } from "../intl/locales";
import { SET_LANG } from "../action-types"

const initialState = LOCALES.ENGLISH;

const lang = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return action.payload;

    default:
      return state;
  }
};

export default lang;
