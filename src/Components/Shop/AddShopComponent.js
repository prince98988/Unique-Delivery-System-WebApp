import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class AddShop extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

      handleSubmit(values) {
        
        this.props.postShop(values);
        this.props.resetShopForm();
        // event.preventDefault();
    }

    render(){
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Shops</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Add New Shop</h3>
                    <hr />
                </div>
            </div>
            <div className="col-12 col-md-9">
                    <Form  model="shopForm" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="shopname" md={2}>Shop Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Shop Name"
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
                            <Label htmlFor="uniqueness" md={2}>Uniqueness  </Label>
                            <Col md={10}>
                                <Control.text  model=".unique" id="unique" name="unique"
                                   placeholder="uniqueness"
                                   className="form-control"
                                   validators={{
                                    required, minLength :minLength(3), maxLength: maxLength(7)
                                   }}
                                />
                            <Errors
                                className="text-danger"
                                model=".unique"
                                show="touched"
                                messages={{
                                    required:"Field is Required ...",
                                    minLength: 'Must be greater than 3 characters ...',
                                    maxLength: 'Must be 7 characters or less'
                                }}
                            />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="user" md={2}>User ID </Label>
                            <Col md={10}>
                                <Control.text  model=".user" id="user" name="user"
                                   placeholder="user ID"
                                   className="form-control"
                                   validators={{
                                    required
                                   }}
                                />
                            <Errors
                                className="text-danger"
                                model=".user"
                                show="touched"
                                messages={{
                                    required:"Field is Required ...", 
                                }}
                            />
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
                                <Label htmlFor="Address" md={2}>Address</Label>
                                <Col md={10}>
                                    <Control.textarea model=".address" id="address" name="address"
                                        rows="5"
                                        className="form-control" />
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Add Shop
                                </Button>
                            </Col>
                        </Row>
                    </Form>
            </div>
        </div>
            
        )
    }
    
}

export default AddShop;