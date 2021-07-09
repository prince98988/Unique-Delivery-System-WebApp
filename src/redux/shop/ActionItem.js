import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const postItem = (item,formData,flag) => (dispatch) => {
    if(!flag){
        const bearer = 'Bearer ' + localStorage.getItem('token');
        return fetch(baseUrl + 'images', {
            method: "POST",
            body: formData,
            headers: {
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
            item={...item,image:baseUrl+"images/items/"+response.path,shop:localStorage.getItem('shop')}
            alert('Your Image Added!\n'+JSON.stringify(response)); 
            dispatch(addItem(item));
            })
        .catch(error =>  { alert('Your image not be posted\nError: '+error.message); });
       }
    else{
        item={...item,image:baseUrl+"images/items/default.jpg",shop:localStorage.getItem('shop')}
        dispatch(addItem(item));
    }
}
export const addItem =(item) =>(dispatch) =>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'items', {
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
        dispatch(fetchCommon(response.category)); 
        console.log('Feedback', response); alert('Your Item Added!\n'+JSON.stringify(response)); 
    })
    .catch(error =>  { console.log('Error', error.message); alert('Your item could not be posted\nError: '+error.message); });
}

export const fetchCommon = (category) => (dispatch) => {
    dispatch(CategoryLoading(category))
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var shop=localStorage.getItem("shop");
    return fetch(baseUrl+"items/" + category,
    {
        method: "POST",
        body: JSON.stringify({"shop":shop}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
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
            dispatch(CategoryFailed(category,error.message))}
            );
}
export const addCategory = (category,items) => ({
    type: ActionTypes.ADD_CATEGORY,
    payload: category,
    items: items

});
export const CategoryLoading = (category) => ({
    type: ActionTypes.CATEGORY_LOADING,
    payload:category
});
export const CategoryFailed = (category,errmess) => ({
    
    type: ActionTypes.CATEGORY_FAILED,
    payload: category,
    error:errmess
});
export const emptyCategory = (category) => ({
    
    type: ActionTypes.CATEGORY_EMPTY,
    payload: category
});

export const deleteCommon = (category) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var shop=localStorage.getItem("shop");
    return fetch(baseUrl+"items/" + category,
    {
        method: "DELETE",
        body: JSON.stringify({"shop":shop}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
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
           
            dispatch(emptyCategory(category))
            
        })
        .catch(error => {
            dispatch(CategoryFailed(error.message))}
            );
}

export const deleteLocalItem = (category,itemId) => ({
    type: ActionTypes.CATEGORY_UPDATE,
    payload:category
});
export const deleteItem = (category,itemId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+"items/" + category,
    {
        method: "DELETE",
        body: JSON.stringify({"_id":itemId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
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
            dispatch(fetchCommon(category))
        })
        .catch(error => {
            console.log("err");
        }
        );
}

export const putItem = (item,formData,flag) => (dispatch) => {
    if(!flag){
        const bearer = 'Bearer ' + localStorage.getItem('token');
        return fetch(baseUrl + 'images', {
            method: "POST",
            body: formData,
            headers: {
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
            item={...item,image:baseUrl+"images/items/"+response.path}
            alert('Your Image Added!\n'+JSON.stringify(response)); 
            dispatch(updateItem(item));
            })
        .catch(error =>  { alert('Your image not be posted\nError: '+error.message); });
       }
    else{
        dispatch(updateItem(item));
    }
}
export const updateItem =(item) =>(dispatch) =>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'items', {
        method: "PUT",
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
        dispatch(fetchCommon(response.category)); 
        console.log('Feedback', response); alert('Your Item Updated!\n'+JSON.stringify(response)); 
    })
    .catch(error =>  { console.log('Error', error.message); alert('Your item could not be updated\nError: '+error.message); });
}