import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const fetchUserItems = (category) => (dispatch) => {
    return fetch(baseUrl+"items/" + category)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            dispatch(addCategory(category,response))
            
        })
        .catch(error => {
            dispatch(CategoryFailed(error.message))}
            );
}
export const addCategory = (category,items) => ({
    type: ActionTypes.ADD_USER_CATEGORY,
    payload: category,
    items: items

});

export const CategoryFailed = (category,errmess) => ({
    
    type: ActionTypes.USER_CATEGORY_FAILED,
    payload: category,
    error:errmess
});


