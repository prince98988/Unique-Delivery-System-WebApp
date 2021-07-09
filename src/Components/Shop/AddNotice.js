import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form } from 'react-redux-form';



class Notice extends Component{
    constructor(props) {
        super(props);
        this.state = {
            category:["Grocery","Clothes","others"],
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
       this.props.postNotice(values,this.state.imageFile,false);
       this.props.resetNoticeForm();
        // event.preventDefault();
    }
    

    render(){
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/shop'>Shop</Link></BreadcrumbItem>
                    <BreadcrumbItem active>UpdateItem</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Add Notice</h3>
                    <hr />
                </div>
            </div>
            <div className="col-12 col-md-9">
                    <Form  model="noticeForm" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                            <Label htmlFor="image" md={2}>Notice Image</Label>
                            <Col md={10}>
                                <Control.file  model=".imageFile" id="imageFile" name="imageFile"
                                    className="form-control"  onChange={this.onChange}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="itemname" md={2}>Notice Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Item Name"
                                    className="form-control"
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
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Post Notice
                                </Button>
                            </Col>
                        </Row>
                    </Form>
            </div>
        </div>
            
        )
    }
    
}

export default Notice;