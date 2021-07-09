import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,Button,Label,Form,FormGroup,Input } from 'reactstrap';
 
import { Link } from 'react-router-dom';


class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            creds: JSON.parse( localStorage.getItem('creds'))
        };
       
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(values) {
      alert('Current State is: ' + JSON.stringify(values));
      
      //this.props.postShop(values);
      //this.props.resetShopForm();
      // event.preventDefault();
  }

    render(){
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>profile</BreadcrumbItem>
                </Breadcrumb>
            </div>
           <div className="col-12 col-md-9">
           <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username"
                           defaultValue={this.state.creds.username}
                        
                            //  innerRef={(input) => this.username1 = input} 
                            // onChange={this.handleInputChange}
                            required/>

                        {/*  {!this.props.auth.isNewUser? <p>Username already taken</p> : <p></p>}
                        {this.props.auth.isChecking? <p>Checking Username...</p> : <p></p>}*/}
                        
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="USER ID">USER ID</Label>
                        <Input type="text" id="password" name="password"
                        defaultValue={this.state.creds._id}
                            disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="firstname">First Name</Label>
                        <Input type="text" id="firstname" name="firstname"
                         defaultValue={this.state.creds.firstname}
                            // innerRef={(input) => this.firstname = input}  
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input type="text" id="lastname" name="lastname"
                           defaultValue={this.state.creds.firstname}
                           // innerRef={(input) => this.lastname = input}  
                           />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="mobileNo">MobileNo</Label>
                        <Input type="mobileNo" id="mobileNo" name="mobileNo"
                            defaultValue={this.state.creds.mobileNo}
                            //innerRef={(input) => this.mobileNo = input} r
                            equired />
                    </FormGroup>
                    {  /*{this.props.auth.isNewUser?
                    <Button type="submit" value="submit" color="primary" >Register</Button>
                    :
                    <Button type="submit" value="submit" color="primary" disabled>Register</Button>
                    }*/}
                        
                    
                </Form>
            </div>
        </div>
            
        )
    }
    
}

export default Profile;