import * as ActionTypes from '../ActionTypes';

export const userItems = (state={
    isError:{Grocery:false,Cloth:false,Other:false},
    isLoading:{Grocery:false,Cloth:false,Other:false},
    category:{Grocery:[],Cloth:[],Other:[]},
     } ,
    action)  =>
    
    {
        switch (action.type) {
         
           case ActionTypes.ADD_USER_CATEGORY:
                return {...state,   
                    category :{...state.category,[action.payload]:action.items},
                    isError:{...state.isError,[action.payload]:false}
                };
            case ActionTypes.USER_CATEGORY_FAILED:
                return {...state, 
                    category :{...state.category,[action.payload]:[]},
                    isError:{...state.isError,[action.payload]:true}
                };
            default:
                return state;
        }

    }

