import * as ActionTypes from "./ActionTypes";

export const Uchats = (
  state = { isLoading: true, errMess: null, uchats: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_UCHAT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        uchats: action.payload
      };

    case ActionTypes.UCHAT_LOADING:
      return { ...state, isLoading: true, errMess: null, uchats: null };

    case ActionTypes.UCHAT_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
