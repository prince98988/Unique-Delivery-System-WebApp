import * as ActionTypes from './ActionTypes';

export const Notice = (state = {
        errMess: "",
        loading:false,
        notice: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.NOTICE_LOADING:
            return {...state,loading:true, errMess: null};
            
        case ActionTypes.ADD_NOTICE:
            return {...state, errMess: null,loading:false, notice: action.payload};

        case ActionTypes.NOTICE_FAILED:
            return {...state,  errMess: action.payload, notice: [],loading:false};
        

        default:
            return state;
    }
}