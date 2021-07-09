import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import {loginUser ,logoutUser, registerUser,checkUser} from '../redux/Actions/ActionsLogin';
import {postItem,fetchCommon, deleteCommon, deleteItem, putItem} from '../redux/shop/ActionItem';
import {postShop} from '../redux/shop/ActionShop';
import {postNotice, fetchNotice} from '../redux/actionNotice';
import {fetchUserItems} from '../redux/Actions/ActionCategory';
import {fetchCart,addToCart} from '../redux/Actions/ActionCart';

import Header from './Header';
import Footer from './Footer';
import Shop from './Shop/ShopComponent';
import AddItem from './Shop/AddItemComponent';
import AddShop from './Shop/AddShopComponent';
import Profile from './profileComponent';
import UpdateItem from './Shop/updateItemComponent';
import Notice from './Shop/AddNotice';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Item from './itemComponent';
import Cart from  './cartComponent';
import Search from './searchItemComponent';



const mapStateToProps = state => {
  return {
    auth: state.auth,
    categories: state.categories,
    notice : state.notice,
    userItems :state.userItems,
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch) => ({
 
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  registerUser:(creds)=> dispatch(registerUser(creds)),
  checkUser:(creds)=> dispatch(checkUser(creds)),
  resetItemForm: () => { dispatch(actions.reset('itemForm')) },
  postItem : (creds,formData,flag) => dispatch(postItem(creds,formData,flag)),
  putItem : (creds,formData,flag) => dispatch(putItem(creds,formData,flag)),
  resetShopForm: () => { dispatch(actions.reset('shopForm')) },
  postShop : (creds) => dispatch(postShop(creds)),
  fetchCommon :(category)=> dispatch(fetchCommon(category)),
  deleteCommon :(category)=> dispatch(deleteCommon(category)),
  deleteItem :(category,itemId)=> dispatch(deleteItem(category,itemId)),
  postNotice : (creds,formData,flag) => dispatch(postNotice(creds,formData,flag)),
  resetNoticeForm: () => { dispatch(actions.reset('noticeForm')) },
  fetchNotice :()=> dispatch(fetchNotice()),
  fetchUserItems :(category)=> dispatch(fetchUserItems(category)),
  addToCart :(item )=> dispatch(addToCart(item)),
  fetchCart :()=> dispatch(fetchCart()),
});


class Main extends Component {
 componentDidMount(){
   
   this.props.fetchNotice();
   this.props.fetchCommon("Grocery");
   this.props.fetchCommon("Cloth");
   this.props.fetchCommon("Other");
   this.props.fetchUserItems("Grocery");
   this.props.fetchUserItems("Cloth");
   this.props.fetchUserItems("Other");
 }
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

  

  render() {
    const ShopPage =() => {
      return (
        <Shop categories={this.props.categories} fetchCommon={this.props.fetchCommon}
              deleteCommon={this.props.deleteCommon} deleteItem={this.props.deleteItem}/>
      );
    }
    const addItem =() => {
      return (
        <AddItem resetItemForm={this.props.resetItemForm} postItem={this.props.postItem} 
                />
      );
    }
    const addshop =() => {
      return (
        <AddShop resetShopForm={this.props.resetShopForm} postShop={this.props.postShop}/>
      );
    }
    const addNotice =() => {
      return (
       <Notice resetNoticeForm={this.props.resetNoticeForm} postNotice={this.props.postNotice}/>
      );
    }
    const profile =() => {
      return (
        <Profile />
      );
    }
    const updateItem =() => {
      return (
        <UpdateItem putItem={this.props.putItem} resetItemForm={this.props.resetItemForm}/>
      );
    }
    const home =() => {
      return (
        <Home notice={this.props.notice}/>
      );
    } 
    const categoryItem =({match}) => {
      return (
        <Category userItems={this.props.userItems.category[match.params.category]} />
      );
    } 
    const itemSelected =() => {
      return (
        <Item addToCart={this.props.addToCart} />
      );
    } 
    const cartCompo =() => {
      return (
        <Cart  />
      );
    } 
    const search =() => {
      return (
        <Search userItems={this.props.userItems}/>
      );
    } 
   
    return (
      <div>
        <Header auth={this.props.auth}  
            loginUser={this.props.loginUser}
            logoutUser={this.props.logoutUser} registerUser={this.props.registerUser}
            checkUser={this.props.checkUser}
            userItems={this.props.userItems}
        />  
        <Switch>

              <Route exact path="/home" component={home} />
              <Route path="/shop" component={ShopPage} />          {/*User Shop */}
              <Route exact path="/additem" component={addItem} />  {/*For add item */}
              <Route exact path="/addshop" component={addshop} />  
              <Route exact path="/profile" component={profile} />
              <Route exact path="/addNotice" component={addNotice} />
              <Route exact path="/updateItem" component={updateItem} />
              <Route path="/home/:category" component={categoryItem} />
              <Route exact path="/item" component={itemSelected} />
              <Route exact path="/cart" component={cartCompo} />
              <Route exact path="/search" component={search} />
              <Redirect to="/home" /> 


        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));