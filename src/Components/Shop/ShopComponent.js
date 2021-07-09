import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,Button,Media,Card} from 'reactstrap';
import { Link,useHistory } from 'react-router-dom';

import {Loading} from '../LoadingComponent';

const Category=(props)=>{
    var itemClicked="";
    let history = useHistory();
    function deleteItem(){
        props.deleteItem(props.category,itemClicked)

    }
    function updateItem(){
        alert(JSON.stringify(itemClicked))
        localStorage.setItem('item',JSON.stringify(itemClicked));
        history.push('/updateItem')
    }
    function deleteCommon(){
        props.deleteCommon(props.category);
    }
    function checkSearch(item) {
        return  (props.search==''||item.name.indexOf(props.search)!=-1 );
    }
    if (props.categories.isLoading[props.category]) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.categories.isError[props.category]){
        return(
        <div>{props.categories} Not Fetch</div>
        );
    }
    else{
        return(
            
            <div className="col-12 m-1">
                {(props.categories.category[props.category].length==0)?<div></div> :
                <Button onClick={deleteCommon} className="mt-2 mb-2 justify-content-end">Delete all</Button>}
                <ul className="list-unstyled">
                    {props.categories.category[props.category].filter(checkSearch).map((item) => {
                        return (
                            <Card className="m-1">
                                <Media>
                                    <Media left href="#">
                                        <Media className="media-image" object src={item.image} alt="Not Loaded" />
                                    </Media>
                                    
                                    <Media body className="ml-3 mt-1">
                                        <Media heading>
                                            <div class="d-flex">
                                                <div class="mr-auto p-2">{item.name}</div>
                                                <div >
                                                    <span className="fa fa-trash" onClick={itemClicked=item._id,deleteItem}></span>{"   "}
                                                    <span className="fa fa-edit" onClick={itemClicked=item,updateItem} ></span>
                                                </div>
                                            </div>
                                            
                                        </Media>

                                        <h3 className="mt-0">
                                            <span className="badge badge-danger">₹ {item.price}</span> 
                                            <span class="badge badge-pill badge-secondary">per {item.unit}</span>
                                            <span class="badge  badge-primary">Parts: {item.parts}</span>
                                        </h3> 
                                        <p >{item.description} </p>
                                    </Media>
                                </Media>  
                            </Card>
                          
                        );
                    })}
            </ul>
        </div>
        )
    }
   

}

class Shop extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            category:["Grocery","Cloth","Other"],
            isDropdownOpen:false,
            selected:"Grocery",
            search: "",
        };
        this.toggleDropdown =this.toggleDropdown.bind(this);
        this.changeSelected =this.changeSelected.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event){
        this.setState({
            search:event.target.value
         })
    }
    changeSelected(event){
        this.setState({
           selected:event.target.value
        })
    }
    toggleDropdown () {
        this.setState({
            isDropdownOpen:!this.state.isDropdownOpen
          });
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Your Shop</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <Link to='/additem'>
                            <Button className="bg-primary">
                                <span className="fa fa-plus-square fa-lg"></span> Add Item
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="row mt-5" >
                    <div className="col-12 col-md-3">
                        <select className="form-control"
                            value={this.state.selected} 
                            onChange={this.changeSelected} >
                            {
                                this.state.category.map(category => (
                                    <option value={category} >{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-11 col-md-8">
                        <input type="text" className="form-control" value={this.state.search}
                            placeholder="search" onChange={this.handleSearch}/> 
                      
                    </div>
                </div>
                <div className="row ">
                   <Category categories={this.props.categories} category={this.state.selected} 
                       fetchCommon={this.props.fetchCommon} search={this.state.search}
                       deleteCommon={this.props.deleteCommon}
                       deleteItem={this.props.deleteItem}
                       />
                </div>
            </div>
        )
    }
}
export default Shop;