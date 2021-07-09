import React, { Component  } from 'react';


class Cart extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          userItem:JSON.parse(localStorage.getItem('userItem'))
        };
        this.onOrder=this.onOrder.bind(this);
    }
    
 
    render(){
       
        return (
         <div></div>
          );
    }
}


export default Cart;