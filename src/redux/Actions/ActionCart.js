import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const fetchCart = (category) => (dispatch) => {
    return fetch(baseUrl+"users/cart")
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
            dispatch(addCart(response))
            
        })
        .catch(error => {
            dispatch(CartFailed(error.message))}
            );
}
export const addCart = (items) => ({
    type: ActionTypes.ADD_CART,
    payload: items

});

export const CartFailed = (errmess) => ({
    
    type: ActionTypes.CART_FAILED,
    payload: errmess
});

export const addToCart =(item) =>(dispatch) =>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'users/cart', {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
        return response;
        } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
        }
    },
    error => {
            throw error;
    })
    .then(response => response.json())
    .then(response => { 
    })
    .catch(error =>  { console.log('Error', error.message)} );
}