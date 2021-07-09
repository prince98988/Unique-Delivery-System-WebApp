import React, { Component  } from 'react';
import { Card,CardImg,CardTitle ,CardBody,CardText,Button} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';


class Item extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          userItem:JSON.parse(localStorage.getItem('userItem'))
        };
        this.onCart=this.onCart.bind(this);
    }
    
    onCart() {
      var creds=JSON.parse(localStorage.getItem('creds'))
      var item={user:creds._id,item:this.state.userItem._id,category:this.state.userItem.category}
      this.props.addToCart(item);
    }

    render(){
       
        return (
           <div className="row row-content">
                <div className="col-3 offset-2" >
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                    
                        <Card>
                            <CardImg top src={this.state.userItem.image} alt={this.state.userItem.name} height="300px"/>
                            <CardBody>
                                <CardTitle>{this.state.userItem.name}</CardTitle>
                                <hr></hr>
                                <CardText className="d-flex justify-content-center">₹ {this.state.userItem.price}</CardText>
                                <CardText className="d-flex justify-content-center">Parts: {this.state.userItem.parts}</CardText>
                                <CardText className="d-flex justify-content-center">Per :  {this.state.userItem.unit}</CardText>
                                <hr></hr>
                                <Button onClick={this.onCart}>Add to Cart</Button>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
                <div>
                    {
                        this.state.userItem.description!=""?
                    <Card>
                        <CardBody>
                            <CardText>{this.state.userItem.description}</CardText>
                        </CardBody>
                    </Card>
                    :<div></div>
                    }
                </div>
           </div> 
          );
    }
}


export default Item;