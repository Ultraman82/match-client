import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label 
} from "reactstrap";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
const noti = io("https://localhost:3443/noti");
const chatnoti = io("https://localhost:3443/chatnoti");

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isNavOpen: false,
      isModalOpen: false,
      isSignupOpen: false,
      chatrooms: null
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      let str = this.props.auth.user.username;
      noti.on(str, data => {
        alert(data);
        this.props.fetchNoties(JSON.parse(localStorage.creds).username);
      });
    }
  }

  /* shouldComponentUpdate() {
    console.log(
      "this.props.chatRooms chouldComponentUpdate" +
        JSON.stringify(this.props.uchats)
    );
  } */

  componentWillReceiveProps() {
    if (
      this.state.chatrooms === null &&
      this.props.chatrooms !== null &&
      this.props.chatrooms !== undefined
    ) {
      let chatrooms = Object.values(this.props.chatrooms);
      //console.log("this.props.chatrooms" + chatrooms);
      this.setState({ chatrooms });
      localStorage.setItem("chatrooms", chatrooms);

      let str = this.props.auth.user.username;
      chatnoti.on(str, data => {
        //console.log("chatnoti from Head:" + data + `keys:${chatrooms}`);
        if (localStorage.inChatroom === "false")
          this.props.fetchUchat(chatrooms);
      });
    }
    //console.log("this.props.uchats.unread" + JSON.stringify(this.props.uchats));
  }

  componentWillUnmount() { }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggleSignup() {
    this.setState({
      isSignupOpen: !this.state.isSignupOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value
    });
    event.preventDefault();
  }

  handleSignup(event) {
    this.toggleSignup();
    this.props.registerUser({
      username: this.username.value,
      password: this.password.value,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value
    });
    event.preventDefault();
  }

  handleLogout() {
    noti.removeAllListeners();
    chatnoti.removeAllListeners();
    this.props.logoutUser();
  }

  render() {
    return (
      <React.Fragment>
        {/* <Navbar dark expand="md"> */}
        <Navbar dark expand="md">          
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} >
              <span className="badge badge-danger">
                {this.props.uchats + this.props.unread !== 0 ? this.props.uchats + this.props.unread : ""}
              </span>
            </NavbarToggler>
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-list fa-lg" /> User List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-heart fa-lg" /> Connected
                    <span className="badge badge-danger">
                      {this.props.uchats !== 0 ? this.props.uchats : ""}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/chat">
                    <span className="fa fa-bell fa-lg" /> Notifications
                    <span className="badge badge-danger">
                      {this.props.unread !== 0 ? this.props.unread : ""}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg" /> Profile
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <div>
                      <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-sign-in fa-lg" /> Login
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw" />
                        ) : null}
                      </Button>
                      <Button outline onClick={this.toggleSignup}>
                        <span className="fa fa-sign-in fa-lg" /> Signup
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw" />
                        ) : null}
                      </Button>
                    </div>
                  ) : (
                      <div>
                        <div className="navbar-text mr-3">
                          {this.props.auth.user.username}
                        </div>
                        <Button outline onClick={this.handleLogout}>
                          <span className="fa fa-sign-out fa-lg" /> Logout
                        {this.props.auth.isFetching ? (
                            <span className="fa fa-spinner fa-pulse fa-fw" />
                          ) : null}
                        </Button>
                      </div>
                    )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>42 Match</h1>
                <p>Wanna Have Fun?!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.isSignupOpen} toggle={this.toggleSignup}>
          <ModalHeader toggle={this.toggleSignup}>Signup</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">First name</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="fisrtname"
                  innerRef={input => (this.firstname = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">Last name</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  innerRef={input => (this.lastname = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  innerRef={input => (this.email = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Signup
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
