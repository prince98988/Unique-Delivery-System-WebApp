import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Auth } from './auth';
import {categories}  from './shop/items'
import { itemForm } from './shop/itemForm';
import {shopForm}  from './shop/shopForm'
import {noticeForm} from './noticeForm';
import {Notice} from './notices';
import {userItems} from './Actions/useritems';
import {Cart} from './Actions/carts';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            categories: categories,
            notice : Notice,
            userItems:userItems,
            cart:Cart,
            ...createForms({
                itemForm : itemForm ,
                shopForm : shopForm,
                noticeForm: noticeForm
            })
        }),
       
        applyMiddleware(thunk, logger)
    );

    return store;
}