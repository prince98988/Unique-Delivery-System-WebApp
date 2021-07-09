import React, { Component  } from 'react';
import {Link,useHistory} from 'react-router-dom';
import { Card,CardImg,CardTitle ,CardBody,CardText} from 'reactstrap';
const Render=(props)=>{
    let history = useHistory();
    var itemSelected=null;
    function handleClick(){
        alert(JSON.stringify(itemSelected))
        localStorage.setItem('userItem',JSON.stringify(itemSelected));
        history.push('/item')
    }
    return(
        <Card >
            <div onClick={itemSelected=props.item ,handleClick}>
                <CardImg height="300px" src={props.item.image} alt={props.item.name} />
                <CardBody>
                    <CardTitle tag="h2" className="d-flex justify-content-center">{props.item.name}</CardTitle>
                    <CardText className="d-flex justify-content-center">₹ {props.item.price}</CardText>
                </CardBody>
            </div>
        </Card>
    );
}
class Category extends Component{
    constructor(props) {
        super(props);
        this.state = {
           search: (this.props.userItems.category["Grocery"].filter(this.checkSearch))
           .concat(this.props.userItems.category["Cloth"].filter(this.checkSearch))
           .concat(this.props.userItems.category["Other"].filter(this.checkSearch))
        };
        this.checkSearch=this.checkSearch.bind(this);
    }
    checkSearch(item) {
        return  (!localStorage.getItem("search")||localStorage.getItem("search")==''||item.name.indexOf(localStorage.getItem("search"))!=-1 );
      }
    render(){
        
          const menu = this.state.search.map((item) => {
            return (
                <div key={item._id} className="col-12 col-md-3 ml-1 mt-3">
                    <Render item={item} />
                </div>
            );
          });
        return (
          
           <div className="container">
            <div className="row row-content">
                { this.props.userItems.length!=0 ?menu: ""}
            </div>
            </div>
          );
    }
}


export default Category;