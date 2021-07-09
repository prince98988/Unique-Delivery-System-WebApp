import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Modal,
    ModalHeader,Button,ModalBody,Label,Form,FormGroup,Input , Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import React, {Component} from 'react';
import { Link ,useHistory} from 'react-router-dom';


class Header extends Component {
    
    constructor(props) {
        super(props);
       
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isLoginModalOpen: false,
          isSignModalOpen:false,
          isDropdownOpen:false,
          search:"",
        };
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignModal = this.toggleSignModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.toggleDropdown =this.toggleDropdown.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }
    
     
      handleSearch(event){
         localStorage.setItem("search",event.target.value);
      }
      toggleDropdown () {
        this.setState({
            isDropdownOpen:!this.state.isDropdownOpen
          });
        }
      handleInputChange(){
          this.props.checkUser({username: this.username1.value});
      }
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleLoginModal() {
        this.setState({
          isLoginModalOpen: !this.state.isLoginModalOpen
        });
      }
      toggleSignModal() {
        this.setState({
          isLoginModalOpen: false,
          isSignModalOpen: !this.state.isSignModalOpen
        });
      }
      handleLogout() {
        this.props.logoutUser();
      }
      handleLogin(event) {
        this.toggleLoginModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
      }
      handleSignUp(event) {
        
        //alert('mobileNo: '+this.mobileNo.value);
        this.toggleSignModal();
        this.props.registerUser({username: this.username1.value, password: this.password1.value,
            mobileNo:this.mobileNo.value, firstname:this.firstname.value, lastname:this.lastname.value
         });
         event.preventDefault();
      }
     

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src={window.location.origin+"/assets/images/logo.png"} height="40" width="51" alt='Our Delivery system' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <input type="text" 
                                    className="form-control ml-5" 
                                    placeholder="Search Item" 
                                    onChange={this.handleSearch}></input>
                            </NavItem>
                            <NavItem>
                               <Link to="/search"><Button>Search</Button></Link>
                            </NavItem>
                           
                            </Nav>
                            
                        </Collapse>
                       
                        <Nav className="ml-auto" navbar>
                                <NavItem className="mr-2">
                                    <Link to='/addNotice'>{(localStorage.getItem('User')=='Normal'||localStorage.getItem('User')=='Admin'
                                    ||!this.props.auth.isAuthenticated)
                                                    ?  ""  : 
                                    <Button outline className="bg-light">
                                            AddNotice
                                        </Button>
                                                    }</Link> 
                                </NavItem>
                                <NavItem>
                                { !this.props.auth.isAuthenticated ?
                                        
                                        <Button outline onClick={this.toggleLoginModal} className="bg-light">
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                                            <DropdownToggle caret>
                                            {this.props.auth.user.username}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem header></DropdownItem>
                                                <Link to='/profile'> <DropdownItem>Account</DropdownItem></Link>
                                                {localStorage.getItem('shop')=='' ? <div></div>:  <Link to='/shop'> <DropdownItem>Your Shop</DropdownItem></Link>}
                                                {(localStorage.getItem('User')=='Normal'||localStorage.getItem('User')=='Admin')
                                                    ?  <div></div>  :
                                                       <Link to='/addshop'> <DropdownItem>Add Shop</DropdownItem></Link>}
                                                <DropdownItem onClick={this.handleLogout}>LogOut</DropdownItem>
                                            </DropdownMenu>
                                      </Dropdown>
                                       </div>
                               }
                               </NavItem>
                        </Nav>
                        <Nav className="ml-1" navbar>
                                <NavItem>
                                    <a onClick={this.toggleModal} ><span className="fa fa-shopping-cart fa-lg"></span > <span className="cart">cart</span></a>
                                </NavItem>
                        </Nav>
                    </div>
                </Navbar>
               
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} 
                                       
                                        required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input}  required/>
                                </FormGroup>
                               {/* <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input}  />
                                        Remember me
                                    </Label>
                               </FormGroup> */}
                                
                                <Button type="submit" value="submit" color="primary">Login</Button>
                                    
                                
                            </Form>
                            <br></br>
                            New User? <Button onClick={this.toggleSignModal} outline className="bg-info" color="#ffffff"> Register</Button>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isSignModalOpen} toggle={this.toggleSignModal}>
                    <ModalHeader toggle={this.toggleSignModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignUp}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username1 = input} 
                                        onChange={this.handleInputChange}
                                        required/>
                                    {!this.props.auth.isNewUser? <p>Username already taken</p> : <p></p>}
                                    {this.props.auth.isChecking? <p>Checking Username...</p> : <p></p>}
                                    
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password1 = input}  required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="firstname">First Name</Label>
                                    <Input type="firstname" id="firstname" name="firstname"
                                        innerRef={(input) => this.firstname = input}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input type="lastname" id="lastname" name="lastname"
                                        innerRef={(input) => this.lastname = input}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="mobileNo">MobileNo</Label>
                                    <Input type="mobileNo" id="mobileNo" name="mobileNo"
                                        innerRef={(input) => this.mobileNo = input} required />
                                </FormGroup>
                               {this.props.auth.isNewUser?
                                <Button type="submit" value="submit" color="primary" >Register</Button>
                                :
                                <Button type="submit" value="submit" color="primary" disabled>Register</Button>
                               }
                                   
                                
                            </Form>
                            
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Header;
