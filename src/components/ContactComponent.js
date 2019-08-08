import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Label,
  Col,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Form, Errors } from "react-redux-form";
import Upload from "./Upload";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
//const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

//const Contact = props => {

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { cSelected: [],
      username: this.props.username,
      firstname: "",
      lastname: "",      
      gender: "",
      prefer: "",
      email: "",
      gps: "",
      biography: "",
      tags:""
     };
    this.ongenderBtnClick = this.ongenderBtnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {                
    //console.log("fetchInfo:" + this.props.fetchInfo + "\nUsername: " + this.props.username, "\nifno:" + this.props.info);
    
    //console.log(JSON.stringify(this.props.fetchInfo(this.props.username)));
    //console.log("aa" + aa);
    /* if(this.props.info !== null) {
      this.props.fetchInfo(this.props.info.username);
    } */
    this.setState({
      ...this.props.info
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {this.setState({gps:position.coords.latitude + "," + position.coords.longitude})});
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  ongenderBtnClick(gender) {
    this.setState({ gender });    
  }

  onPreferClick(prefer) {
    console.log(JSON.stringify(this.state));
    this.setState({ prefer });
  }

  handleSubmit(values) {        
    this.props.postFeedback({...values, username:this.props.info.username, gps:this.state.gps});
    this.props.resetFeedbackForm();
  }
/* 
  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  } */

  render() {    
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Dashboard</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Dashboard</h3>
            <hr />
          </div>
        </div>        
        <div className="row row-content">
          <div className="col-12">
            <h3>Edit your Info</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form
              model="feedback"
              onSubmit={values => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".firstname"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    defaultValue={this.state.firstname}
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastname" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".lastname"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control"
                    defaultValue={this.state.lastname}                    
                  />
                </Col>
              </Row>              
              <Row>
              <Label htmlFor="preference" md={2}>
                Gender
                </Label>                      
                <Col md={10}>
                <ButtonGroup>                  
                  <Button outline size="sm" color="primary" onClick={() => this.ongenderBtnClick("male")} active={this.state.gender === "male"}>Male</Button>
                  <Button outline size="sm" color="primary" onClick={() => this.ongenderBtnClick("female")} active={this.state.gender === "female"}>Female</Button>
                </ButtonGroup>
                <p>Selected: {this.state.gender}</p>
                </Col>
              </Row>
              <Row>
              <Label htmlFor="preference" md={2}>
                Preference
                </Label>     
                <Col md={10}>
                <ButtonGroup>
                  <Button outline size="sm" color="primary" onClick={() => this.onPreferClick("by")} active={this.state.prefer === "by"}>By Sexual</Button>
                  <Button outline size="sm" color="primary" onClick={() => this.onPreferClick("male")} active={this.state.prefer === "male"}>Male</Button>
                  <Button outline size="sm" color="primary" onClick={() => this.onPreferClick("female")} active={this.state.prefer === "female"}>Female</Button>
                </ButtonGroup>
                <p>Selected: {this.state.prefer}</p>
                  </Col>                 
              </Row>
              <Row className="form-group">
                <Label htmlFor="tags" md={2}>
                  Contact Tel.
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".tags"
                    id="tags"
                    name="tags"                
                    placeholder="Tags with #"
                    defaultValue={this.state.tags}
                    className="form-control"                    
                  />                  
                </Col>
              </Row>
              {/* <Row className="form-group">
                <Label htmlFor="tags" md={2}>
                  Contact Tel.
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".tags"
                    id="tags"
                    name="tags"                
                    placeholder="Tags with #"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                      isNumber
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".tags"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 numbers",
                      maxLength: "Must be 15 numbers or less",
                      isNumber: "Must be a number"
                    }}
                  />
                </Col>
              </Row> */}
              <Row className="form-group">
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    defaultValue={this.state.email}
                    validators={{
                      required,
                      validEmail
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                      required: "Required",
                      validEmail: "Invalid Email Address"
                    }}
                  />
                </Col>
              </Row>
              {/* <Row className="form-group">
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".agree"
                        name="agree"
                        className="form-check-input"
                      />{" "}
                      <strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Control.select
                    model=".contactType"
                    name="contactType"
                    className="form-control"
                  >
                    <option>Tel.</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </Row> */}
              <Row className="form-group">
                <Label htmlFor="biography" md={2}>
                  Biography
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".biography"
                    id="biography"
                    name="biography"
                    rows="12"
                    className="form-control"
                    defaultValue={this.state.biography}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Confirm
                  </Button>
                </Col>
              </Row>
              {/* <Upload gallery={this.props.info.gallery !== [] ? this.props.info.gallery:null}/> */}
              <Upload gallery={this.props.info.gallery} username={this.props.info.username}/>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
