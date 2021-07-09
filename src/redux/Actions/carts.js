import * as ActionTypes from '../ActionTypes';

export const Cart = (state={
    isError:false,
    cart :[ ],
     } ,
    action)  =>
    
    {
        switch (action.type) {
         
           case ActionTypes.ADD_CART:
                return {...state,   
                    cart :action.payload,
                    isError:false
                };
            case ActionTypes.CART_FAILED:
                return {...state, 
                    cart :[],
                    isError:true
                };
            default:
                return state;
        }

    }

