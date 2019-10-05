import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  ModalBody,
  Row
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.props.profile.gallery });

    /* if(localStorage.length !== 0)
      fetch(baseUrl + "users/add/profile", {
        method: "POST",
        body: JSON.stringify({
          user:JSON.parse(localStorage.creds).username,
          data:this.props.profile.username}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(result => result.json())
      .then(result => {console.log(result.message)}); */
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.state.items.map(item => {
      return (
        <CarouselItem
          className="custom-tag text-center"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item}
        >
          <img
            src={baseUrl + item}
            alt={item}
            style={{ width: "auto", height: "300px" }}
          />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {`.custom-tag {                                
            background: linear-gradient(262deg, #ff7854, #fd267d);
          }`}
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <ModalBody>
          {this.props.profile ? (
            <div>
              <header style={{ textAlign: "center" }}>
                <h3>
                  {this.props.profile.firstname} {this.props.profile.lastname},{" "}
                  {this.props.profile.age}
                </h3>
                <h6>
                  {this.props.profile.fame}% / {this.props.profile.distance}{" "}
                  miles
                </h6>
              </header>
              <h6 style={{ display: "flex" }}>
                {Object.keys(this.props.profile.tags).map((tag, index) => {
                  if (this.props.profile.tags[tag]) {
                    return (
                      <p
                        style={{
                          fontStyle: "italic",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          width: "100%",
                          padding: "0",
                          listStyle: "none"
                        }}
                        key={index}
                      >
                        {tag}
                      </p>
                    );
                  } else {
                    return "";
                  }
                })}
              </h6>
              <p style={{ textAlign: "center" }}>
                {this.props.profile.biography}
                <br />
                <small>last login : {this.props.profile.last_login}</small>
              </p>

              <Row className="row justify-content-center">
                {this.props.like === true ? (
                  <span
                    onClick={() => {
                      /* console.log(
                      "props.profile.username" + this.props.profile.username
                    ); */
                      this.props.postFavorite([
                        JSON.parse(localStorage.creds).username,
                        this.props.profile.username
                      ]);
                    }}
                    className="col-auto fa fa-heart fa-lg mouseover"
                    style={{ color: "#E91E63" }}
                  />
                ) : (
                  ""
                )}
              </Row>
            </div>
          ) : (
            "egweg"
          )}
        </ModalBody>
      </div>
    );
  }
}

export default Profile;
