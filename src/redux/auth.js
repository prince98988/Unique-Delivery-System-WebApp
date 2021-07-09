import * as ActionTypes from './ActionTypes';

export const Auth = (state={
    isNewUser:true,
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null }  ,
    action)  =>
    
    {
        switch (action.type) {
            case ActionTypes.LOGIN_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: false,
                    user: action.creds
                };
            case ActionTypes.LOGIN_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    errMess: '',
                    token: action.token
                };
            case ActionTypes.LOGIN_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMess: action.message
                };
            case ActionTypes.LOGOUT_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: true
                };
            case ActionTypes.LOGOUT_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    token: '',
                    user: null
                };
            case ActionTypes.REGISTER_REQUEST:
                return{...state,
                    isLoading: true,
                    isNewUser:false,
                    isAuthenticated: false,
                };
            case ActionTypes.REGISTER_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    errMess: '',
                };
            case ActionTypes.USER_CHECK:
                return {...state,
                    isLoading: false,
                    isNewUser: true,
                    isChecking: false,
                    errMess: '',
                };
            case ActionTypes.REQUEST_USER_CHECK:
                return {...state,
                    isLoading: false,
                    isNewUser: true,
                    isChecking: true,
                    errMess: '',
                };
            case ActionTypes.USER_CHECK_ERROR:
                return {...state,
                    isLoading: false,
                    isNewUser: false,
                    isChecking: false,
                    errMess: '',
                };

           

         
            default:
                return state
        }

    }

