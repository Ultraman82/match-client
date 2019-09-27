import React, { Component } from "react";
import {
  Button,
  Label,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader
} from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
      /* ageS: null,
      ageL: null,
      fameS: null,
      fameL: null */
    };
    this.toggle = this.toggle.bind(this);
  }

  //componentWillMount() {}

  handleSubmit(values) {
    //console.log(JSON.stringify(values));    
    if (localStorage.length === 0) {
      alert("Login First");
    } else {
      this.props.fetchUsers({ ...values, username:JSON.parse(localStorage.creds).username});
    }    
    //this.props.fetchUsers(values);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="container" style={{ margin: "10px" }}>
        <div className="row">
          <div className="col-12">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle color="primary">Filter / Sort</DropdownToggle>
              <DropdownMenu>
                <Form
                  model="filter"
                  onSubmit={values => this.handleSubmit(values)}                  
                  style={{ margin: "10px" }}
                >
                  <Row >
                    <Col>
                      {/* <Control.select
                        model=".ageL"
                        id="ageL"
                        name="ageL"
                        className="form-control"
                        >
                        <option value="" />
                        <option value="-3">-3</option>
                        <option value="-5">-5</option>
                        <option value="-10">-10</option>
                      </Control.select> */}
                      <Control.text
                        model=".ageL"
                        id="ageL"
                        name="ageL"
                        className="form-control"
                      ></Control.text>
                    </Col>
                    
                    <Label htmlFor="filter" >
                    &#60; Age &#60;
                    </Label>
                    
                    <Col>
                      <Control.text
                        model=".ageS"
                        id="ageS"
                        name="ageS"
                        className="form-control"
                      ></Control.text>
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col >
                      <Control.input
                        model=".fameL"
                        id="fameL"
                        name="fameL"
                        className="form-control"                        
                      ></Control.input>
                    </Col>
                    <Label htmlFor="filter" >
                      &#60; Fame &#60;
                    </Label>
                    <Col >
                      <Control.input
                        model=".fameS"
                        id="fameS"
                        name="fameS"
                        className="form-control"
                      ></Control.input>
                    </Col>
                  </Row>
                  <br />
                  <Row>                    
                  <Col />
                    <Label htmlFor="filter" >
                      Distance &#60;
                    </Label>
                    <Col >
                      <Control.input
                        model=".distanceS"
                        id="distanceS"
                        name="distanceS"
                        className="form-control"
                      ></Control.input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                  <Col />
                  <Label htmlFor="filter" >
                      Shared Tags &#62; 
                    </Label>
                    <Col >
                      <Control.select
                        model=".comtagS"
                        id="comtagS"
                        name="comtagS"
                        className="form-control"
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                  <Col />                  
                  <Label htmlFor="filter" >
                      Sort By
                    </Label>
                    <Col >
                      <Control.select
                        model=".sortby"
                        id="sortby"
                        name="sortby"
                        className="form-control"
                      >
                        <option value="age">Age</option>
                        <option value="distance">Distance</option>
                        <option value="fame">Fame</option>
                        <option value="tags">Comman Tags</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <br></br>
                  <Row className="form-group">
                    <Col md={{ size: 10, offset: 4 }}>
                      <Button type="submit" color="primary">
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

/* 

<Button onClick={e => this.toggle(e)} color="primary">
          Filter
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggle}
          className="col-md-6"
        >
          <ModalHeader toggle={this.toggle}>Filter</ModalHeader>
</Modal>

              
              */

export default Filter;
