import React, { Component } from "react";
import Profile from "./Profile";
import Filter from "./Filter";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  CardHeader,
  Modal,
  ModalHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

class RenderUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardImg
            className="mouseover"
            width="100%"
            src={baseUrl + this.props.user.profile}
            alt={this.props.user.username}
            onClick={e => {
              e.preventDefault();
              this.toggleModal();
            }}
          />
          <CardBody>
            <CardText className="row justify-content-center">
              <span className="col-auto">{this.props.user.username}</span>
              <span
                onClick={e => {
                  e.preventDefault();
                  alert(
                    `We sent message to ${this.props.user.username}. Lets see you would be liked!`
                  );
                  this.props.postFavorite([
                    this.props.username,
                    this.props.user.username
                  ]);
                }}
                className="col-auto fa fa-heart fa-lg mouseover"
                style={{ color: "#E91E63" }}
              />
              <span className="col-auto fa fa-close fa-lg mouseover" />
            </CardText>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Profile</ModalHeader>
          <Profile
            profile={this.props.user}
            postFavorite={this.props.postFavorite}
          />
        </Modal>
      </div>
    );
  }
}

/* function RenderUser({ user, postFavorite, username }) {
  return (
    <div>
      <Card>
        <CardImg
          width="100%"
          src={baseUrl + user.profile}
          alt={user.username}
        />
        <CardBody>
          <CardText className="row justify-content-center">
            <div className="col-auto">{user.username}</div>
            <span
              className="col-auto fa fa-address-card fa-lg"
              style={{ color: "#6A1B9A" }}
            />
            <span
              onClick={e => {
                e.preventDefault();
                postFavorite([username, user.username]);
              }}
              className="col-auto fa fa-heart fa-lg"
              style={{ color: "#E91E63" }}
            />
            <span className="col-auto fa fa-close fa-lg dislike" />
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
} */

const Users = props => {
  //console.log("props in Users:" + props.postFavorite);
  const userlist = props.users.map(user => {
    return (
      /* <div key={user._id} className="col-12 col-md-3 m-1">
      <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-3 my-1">*/
      <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-4 my-1">
        <RenderUser
          user={user}
          postFavorite={props.postFavorite}
          username={props.username}
        />
      </div>
    );
  });

  if (props.users.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.users.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.users.errMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <Filter />
        <div className="row">{userlist}</div>
      </div>
    );
};

export default Users;
