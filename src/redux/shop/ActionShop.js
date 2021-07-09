import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const makeShop = (item) => (dispatch) =>{
  const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'shops/user', {
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
    .then(response => { console.log('Shop ', response); alert('Shops Added!\n'); })
    .catch(error =>  { console.log('Shop', error.message); alert('Shop not be added to account\nError: '+error.message); });
}
export const postShop = (item) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'shops', {
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
     alert("Shop Created");
     dispatch(makeShop({id:item.user,shop:response._id}));
     console.log('Shop ', response); 
    })
    .catch(error =>  { console.log('Shop', error.message); alert('Shop not be posted \nError: '+error.message); });
};
