import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class AddItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            category:["Grocery","Cloth","Other"],
            imageFile:-1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
       
        this.onChange =this.onChange.bind(this);
    }

    onChange(e) {
        let formData = new FormData();
        formData.append("imageFile", e.target.files[0]);
        this.setState({
            imageFile:formData
        })
    }
    handleSubmit(values) {
       var flag=false;
       if(this.state.imageFile==-1){
        flag=true;
       }
       this.props.postItem(values,this.state.imageFile,flag);
       this.props.resetItemForm();
       this.setState({
        imageFile:-1
       })
        // event.preventDefault();
    }
    

    render(){
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/shop'>Shop</Link></BreadcrumbItem>
                    <BreadcrumbItem active>AddItem</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Add Your Shop Item</h3>
                    <hr />
                </div>
            </div>
            <div className="col-12 col-md-9">
                    <Form  model="itemForm" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                            <Label htmlFor="image" md={2}>Image File</Label>
                            <Col md={10}>
                                <Control.file  model=".imageFile" id="imageFile" name="imageFile"
                                    className="form-control"  onChange={this.onChange}/>
                              
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="itemname" md={2}>Item Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Item Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="price" md={2}>Price  </Label>
                            <Col md={3}>
                                <Control.text  model=".price" id="price" name="price"
                                   placeholder=" ₹ amount"
                                   className="form-control"
                                   validators={{
                                    required,isNumber
                                   }}
                                />
                            <Errors
                                className="text-danger"
                                model=".price"
                                show="touched"
                                messages={{
                                    required:"Field is Required ...",
                                    isNumber: 'Must be a number'
                                }}
                            />
                            </Col>
                            <Label htmlFor="unit" md={1}>per  </Label>
                            <Col md={4}>
                                <Control.text  model=".unit" id="unit" name="unit"
                                   placeholder="kg/gram/unit"
                                   className="form-control"
                                   validators={{
                                     minLength: minLength(1), maxLength: maxLength(15)
                                   }}
                                />
                            <Errors
                                className="text-danger"
                                model=".unit"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 1 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                            </Col>
                            
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="parts" md={2}>Sell item in parts?</Label>
                            <Col md={3}>
                                <Control.select model=".parts" name="parts"
                                    className="form-control"  
                                   >
                                    <option value="Yes" >Yes</option>
                                    <option value="No">No</option>
                                </Control.select>
                              
                            </Col>
                            <Label htmlFor="Category" md={2}>Category</Label>
                            <Col md={3}>
                                <Control.select model=".category" name="category"
                                    className="form-control"  
                                   >
                                    {
                                    this.state.category.map(category => (
                                        <option value={category} >{category}</option>
                                     ))
                                     }
                                </Control.select>
                               
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="description" md={2}>Extra Details or Description</Label>
                                <Col md={10}>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="5"
                                        className="form-control" />
                                </Col>
                            </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Add Item
                                </Button>
                            </Col>
                        </Row>
                    </Form>
            </div>
        </div>
            
        )
    }
    
}

export default AddItem;