import React, { Component } from "react";
import {
  Button,
  Label,
  Col,
  Row
} from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageS: null,
      ageL: null,
      distanceS: null,
      distanceL: null
    };
  }

  componentWillMount() {

  }



  handleSubmit(values) {
    console.log(JSON.stringify(values));
  }

  render() {
    return (
      <div className="container">
        <div className="row row-content">
          <div className="col-12">
            <h3>Filter</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form
              model="filter"
              onSubmit={values => this.handleSubmit(values)}
            >
              <Row>
                <Col md={2}>
                  <Control.select
                    model=".ageL"
                    id="ageL"
                    name="ageL"
                    className="form-control"
                  >
                    <option value="" />
                    <option value="-3">-3</option>
                    <option value="-5">-5</option>
                    <option value="-10">-10</option>
                  </Control.select>
                </Col>
                <Label htmlFor="prefer" md={2}>
                  &#60; Age &#60;
                </Label>
                <Col md={2}>
                  <Control.select
                    model=".ageS"
                    id="ageS"
                    name="ageS"
                    className="form-control"
                  >
                    <option value="" />
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </Control.select>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <Control.select
                    model=".distanceL"
                    id="distanceL"
                    name="distanceL"
                    className="form-control"
                  >
                    <option value="" />
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </Control.select>
                </Col>
                <Label htmlFor="prefer" md={2}>
                  &#60; Distance &#60;
                </Label>
                <Col md={2}>
                  <Control.select
                    model=".distanceS"
                    id="distanceS"
                    name="distanceS"
                    className="form-control"
                  >
                    <option value="" />
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
