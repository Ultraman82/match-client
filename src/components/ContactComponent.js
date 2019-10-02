import React, { Component } from "react";
import {  
  Button,
  Label,
  Col,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Form, Errors } from "react-redux-form";
import Upload from "./Upload";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const path = require("path");
require("dotenv").config();

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
//const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //username: this.props.username,
      //tags: {},
      hideGps: false
    };
    this.tagClick = this.tagClick.bind(this);
  }

  componentWillMount() {                
    this.setState({
      ...this.props.info
    });        
  }

  hideGps() {    
    fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(result => {    
      //console.log(result.ip);        
      fetch(`https://ipinfo.io/${result.ip}/json?token=1f700d00426ba7`)
      .then(result => result.json())
      .then(result => {
        let gps = result.loc.split(',');
        this.setState({gps:{lat:gps[0], lng:gps[1]}, hideGps:true});
        //console.log("gps from hideGps = " + gps);
    })
    .catch(error => console.log(error));
  })
}

  tagClick(tag) {
    this.setState({
      tags: { ...this.state.tags, [tag]: !this.state.tags[tag] }
    });
  }
  getCurrentLocation(e) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          gps: { lat: position.coords.latitude, lng: position.coords.longitude },
          hideGps: false
        });
      });
    } else {
      fetch("https://jsonip.com")
      .then(result => {        
        fetch(`https://ipinfo.io/${result.ip}/json?token=1f700d00426ba7`
          ).then(result => console.log(result))
      });      
      alert("Geolocation is not supported by this browser.");
    }
    e.preventDefault();
  }

  handleSubmit(values) {
    console.log(values);
    this.props.postFeedback({
      ...values,
      tags: this.state.tags,
      username: this.props.info.username,
      gps: this.state.gps
    });    
  }

  render() {    
    console.log("process.env.MAP_API" + JSON.stringify(process.env));
    const Map = compose(
      withProps({       
        googleMapURL:
          `https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_API}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(() => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={this.state.gps}
        onClick={t => this.setState({ gps: t.latLng })}
      >
        <Marker position={this.state.gps} />
      </GoogleMap>
    ));

    const renderTags = this.state.tags ? (Object.keys(this.state.tags).map(tag => {
      return (
        <Button
          style={{margin:"5px"}}
          key={tag}
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
    })) :("");
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Edit your Info</h3>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <Form model="feedback" onSubmit={values => this.handleSubmit(values)}>
            <Row>
              <Label htmlFor="prefer" md={2}>
                Location
                <Button style={{margin:"10px"}} color="primary" size="sm" onClick={e => this.getCurrentLocation(e)}>
                  Get location
                </Button>
                <Button style={{margin:"10px"}} color="primary" size="sm" onClick={() => {this.hideGps()}}>
                  Hide Location
                </Button>
              </Label>
              {
                this.state.gps !== undefined && this.state.hideGps === false ? 
                (<Col md={10}>                                    
                  <Map />
                </Col>):
                ("")
              }
              
            </Row>
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
            <Row className="form-group">
              <Label htmlFor="gender" md={2}>
                Gender
              </Label>
              <Col md={10}>              
              <Control.select
                  model=".gender"
                  id="gender"
                  name="gender"
                  defaultValue={this.state.gender}
                  className="form-control"
                >                  
                  <option value="male">male</option>
                  <option value="female">female</option>                 
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
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
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="bi">Bi-sexual</option>
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
            <Row className="form-group">
              <Label htmlFor="age" md={2}>
                Age
              </Label>
              <Col md={10}>
                <Control
                  model=".age"
                  id="age"
                  name="age"
                  defaultValue={this.state.age}
                  className="form-control"
                ></Control>
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
              gallery={this.props.info !== null? this.props.info.gallery : null}
              username={this.props.info !== null ? this.props.info.username: ""}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Contact;
