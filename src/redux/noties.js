import * as ActionTypes from './ActionTypes';

export const Noties = (state  = { isLoading: true,
                                    errMess: null,
                                    noties:null}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NOTIES:
        return {...state, isLoading: false, errMess: null, noties: action.payload};

        case ActionTypes.NOTIES_LOADING:
            return {...state, isLoading: true, errMess: null, noties: null}

        case ActionTypes.NOTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};