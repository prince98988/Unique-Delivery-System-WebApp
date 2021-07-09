import { baseUrl } from '../shared/baseUrl';
import * as ActionTypes from './ActionTypes';
export const NoticeLoading = () => ({
    type: ActionTypes.NOTICE_LOADING
});
export const addNotice = (items) => ({
    type: ActionTypes.ADD_NOTICE,
    payload: items
});
export const NoticeFailed = (errmess) => ({
    type: ActionTypes.NOTICE_FAILED,
    payload: errmess,
});
export const fetchNotice = () => (dispatch) => {
    dispatch(NoticeLoading);
    return fetch(baseUrl+"notice" )
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
            dispatch(addNotice(response))
            
        })
        .catch(error => {
            dispatch(NoticeFailed(error.message))}
        );
}

export const postNotice = (item,formData,flag) => (dispatch) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        return fetch(baseUrl + 'images/notice', {
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
            item={...item,image:baseUrl+"images/notice/"+response.path}
            alert('Your Image Added!\n'+JSON.stringify(response)); 
            dispatch(addItem(item));
            })
        .catch(error =>  { alert('Your image not be posted\nError: '+error.message); });
       

}
export const addItem =(item) =>(dispatch) =>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'notice', {
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
        dispatch(fetchNotice);
        alert('Your Notice Added!\n'+JSON.stringify(response)); 
    })
    .catch(error =>  { console.log('Error', error.message); alert('Your notice could not be posted\nError: '+error.message); });
}