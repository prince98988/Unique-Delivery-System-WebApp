import { baseUrl } from '../../shared/baseUrl';
import * as ActionTypes from '../ActionTypes';
import  {fetchCommon} from '../shop/ActionItem';

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const checkUserType = () => (dispatch) =>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'users/checkJWTtoken',{
        method: 'GET',
        headers: { 
            'Content-Type':'application/json' ,
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
    .then((user) => {
        localStorage.setItem("User",user.user);
    })
    .catch(error => {
        localStorage.setItem("User","Normal");
    });
}
export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    
    dispatch(requestLogin(creds))
    console.log(creds);
    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
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
        if (response.success) {
            // If login was successful, set the token in local storage
            if(response.user.shop!=undefined){
               localStorage.setItem("shop",response.user.shop);
            }
            else{
                localStorage.setItem("shop","");
            }
            
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(response.user));
            dispatch(receiveLogin(response));
            dispatch(dispatch(checkUserType));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => 
        {
            alert("Error :"+error.message)
            dispatch(loginError(error.message))
        })
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
    dispatch(noticeError);
}

//----For Register----
export const noticeError = () => {
    return {
        type: ActionTypes.NOTICE_FAILED
    }
}

export const requestRegister = () => {
    return {
        type: ActionTypes.REGISTER_REQUEST
    }
}

export const registerUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
   
    dispatch(requestRegister());
   
    return  fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
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
        if (response.success) {
            // If sign was successful, call login
            dispatch(loginUser(creds));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => 
        {
            alert("Error :"+error.message);
            dispatch(loginError(error.message))
        })
};


export const checkUserSuccess = () => {
    return {
        type: ActionTypes.USER_CHECK
    }
}
export const requestUserCheck= ()=>{
    return {
        type: ActionTypes.REQUEST_USER_CHECK
    }
}
export const checkErr = ()=>{
    return {
        type: ActionTypes.USER_CHECK_ERROR
    }
}
export const checkUser = (creds) => (dispatch) => {
    dispatch(requestUserCheck());
    return  fetch(baseUrl + 'users/signup/user', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
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
        if (response.success) {
            dispatch(checkUserSuccess());
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => 
        {
            //alert("Error :"+error.message);
            dispatch(checkErr());
            dispatch(loginError(error.message));
            
        })
};