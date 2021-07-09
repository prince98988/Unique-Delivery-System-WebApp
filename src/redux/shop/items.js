import * as ActionTypes from '../ActionTypes';

var filter="";
function updateItem(item){
    return item._id!==filter;
}
export const categories = (state={
    isError:{Grocery:false,Cloth:false,Other:false},
    isLoading:{Grocery:false,Cloth:false,Other:false},
    category:{Grocery:[],Cloth:[],Other:[]},
    errMess: null } ,
    action)  =>
    
    {
        switch (action.type) {
           case ActionTypes.CATEGORY_LOADING:
                return {...state,  errMess: null,
                    isLoading:{...state.isLoading,[action.payload]:true}}
           case ActionTypes.ADD_CATEGORY:
                return {...state,  errMess: null, 
                    category :{...state.category,[action.payload]:action.items},
                    isLoading:{...state.isLoading,[action.payload]:false}
                };
            case ActionTypes.CATEGORY_FAILED:
                return {...state, 
                    category :{...state.category,[action.payload]:[]},
                    isLoading:{...state.isLoading,[action.payload]:false},
                    isError:{...state.isError,[action.payload]:true}
                };
            case ActionTypes.CATEGORY_EMPTY :
                return {...state, 
                    category :{...state.category,[action.payload]:[]},
                    isLoading:{...state.isLoading,[action.payload]:false},
                    isError:{...state.isError,[action.payload]:false}
                };
            case ActionTypes.CATEGORY_UPDATE :
                filter=action.itemId;
                return {...state, 
                    category :{...state.category,
                        [action.payload]:state.category[action.payload].filter(updateItem)},
                    isLoading:{...state.isLoading,[action.payload]:false},
                    isError:{...state.isError,[action.payload]:false}
                };
         
            default:
                return state;
        }

    }

