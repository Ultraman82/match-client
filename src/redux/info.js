import * as ActionTypes from './ActionTypes';

export const Info = (state = {
        isLoading: true,
        errMess: null,
        info: null,
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_INFO:
            return {...state, isLoading: false, errMess: null, info: action.payload};

        case ActionTypes.INFO_LOADING:
            return {...state, isLoading: true, errMess: null, info: null};

        case ActionTypes.INFO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, info: null};

        default:
            return state;
    }
}