import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Modal,
  ModalBody,
  ModalHeader,
  CarouselIndicators,
  CarouselCaption,
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
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item}
        >
          <img
            src={"https://localhost:3443/" + item}
            alt={item}
            style={{ width: "100%", height:"300px" }}
          />
        </CarouselItem>
      );
    });

    /* if (!this.props.isModalOpen) {
      return null;
    } else{ */
    return (
      <div>
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
              <h3>
                {this.props.profile.firstname} {this.props.profile.lastname}
              </h3>
              <h5>
                Interest:
                {Object.keys(this.props.profile.tags).map(tag => {
                  if (this.props.profile.tags[tag]) {
                    return <div>{tag}</div>;
                  }
                })}
              </h5>
              <p>{this.props.profile.biography}</p>
              <row className="row justify-content-center">
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
                  className="col-auto fa fa-heart fa-lg"
                  style={{ color: "#E91E63" }}
                />
                <span className="col-auto fa fa-close fa-lg dislike" />
              </row>
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
