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
    this.state = {
      username: this.props.username,
      tags: {}
    };
    this.tagClick = this.tagClick.bind(this);
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
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          gps: position.coords.latitude + "," + position.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  tagClick(tag) {
    this.setState({
      tags: { ...this.state.tags, [tag]: !this.state.tags[tag] }
    });
  }

  handleSubmit(values) {
    console.log(values);
    this.props.postFeedback({
      ...values,
      tags: this.state.tags,
      username: this.props.info.username,
      gps: this.state.gps
    });
    //this.props.resetFeedbackForm();
  }

  /* renderTags() {
    Object.keys(this.state.tags).map(tag => {
      console.log(tag);
      return <p>{tag}</p>;
    });
  } */
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
    const renderTags = Object.keys(this.state.tags).map(tag => {
      return (
        <Button
          className="col-sm-2"
          outline
          color="primary"
          active={this.state.tags[tag]}
          onClick={() => {
            this.tagClick(tag);
          }}
        >
          {tag}
        </Button>
      );
    });
    return (
      <div className="container">
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
                <Label htmlFor="gender" md={2}>
                  Gender
                </Label>
                <Col md={10}>
                  <label>
                    <Control.radio
                      model=".gender"
                      value="male"
                      checked={this.state.gender === "male"}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <Control.radio
                      model=".gender"
                      value="female"
                      checked={this.state.gender === "female"}
                    />{" "}
                    Female
                  </label>
                </Col>
              </Row>
              <Row>
                <Label htmlFor="prefer" md={2}>
                  Preference
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".prefer"
                    id="prefer"
                    name="prefer"
                    defaultValue={this.state.prefer}
                    className="form-control"
                  >
                    <option value="" />
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="by">By Sexual</option>
                  </Control.select>
                </Col>
              </Row>
              {/*               <Row>
                <Label htmlFor="dof" md={2}>
                  Day of Birth
                </Label>
                <Col md={10}>
                  <input type="date" id="dof" name="dof"
                    min="1970-01-01" max="2018-12-31" />
                </Col>
              </Row> */}
              <Row>
                <Label htmlFor="dob" md={2}>
                  Day of Birth
                </Label>
                <Col md={10}>
                  <Control
                    type="date"
                    model=".dob"
                    id="dob"
                    name="dob"
                    defaultValue={this.state.dob}
                    className="form-control"
                  >
                  </Control>
                </Col>
              </Row>
              <Row>
                <Label htmlFor="tags" md={2}>
                  Tags
                </Label>
                <Col md={10}>{renderTags}</Col>
              </Row>

              {/* <Row className="form-group">
                <Label htmlFor="tags" md={2}>
                  Interests
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
              </Row> */}
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
              <Upload
                gallery={
                  this.props.info.gallery ? this.props.info.gallery : null
                }
                username={this.props.info.username}
              />
            </Form>
          </div>
        </div>
      </div >
    );
  }
}

export default Contact;
