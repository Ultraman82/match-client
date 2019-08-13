import * as ActionTypes from './ActionTypes';

export const Lusers = (state = {
        isLoading: true,
        errMess: null,
        lusers: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LUSERS:
            return {...state, isLoading: false, errMess: null, lusers: action.payload};

        case ActionTypes.LUSERS_LOADING:
            return {...state, isLoading: true, errMess: null, lusers: []};

        case ActionTypes.LUSERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, lusers: []};

        default:
            return state;
    }
}