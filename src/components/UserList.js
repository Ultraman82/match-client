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
    this.postBlacklist = this.postBlacklist.bind(this);
    this.checkProfile = this.checkProfile.bind(this);
  }
  postBlacklist = user => {
    if (!localStorage.creds) {
      alert("You need to log on first");
    } else {
      alert(`User ${user} is reported as fake account.`);
      return fetch(baseUrl + `users/add/blacklist?user=${user}`)
        .then(response => response.json())
        .then(response => {
          console.log("Blaklist Added", response);
          window.location.reload();
        })
        .catch(error => console.log(error));
    }
  };

  checkProfile() {
    if (localStorage.length !== 0)
      fetch(baseUrl + "users/add/profile", {
        method: "POST",
        body: JSON.stringify({
          user: JSON.parse(localStorage.creds).username,
          data: this.props.user.username
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(result => result.json())
        .then(result => {
          console.log(result.message);
        });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  reportUser() {}

  render() {
    return (
      <div>
        <Card style={{ maxWidth: "250px" }}>
          <CardImg
            className="mouseover img-responsive"
            height="300px"
            overflow="hidden"
            src={baseUrl + this.props.user.profile}
            alt={this.props.user.username}
            onClick={e => {
              e.preventDefault();
              this.checkProfile();
              this.toggleModal();
            }}
          />
          <CardBody>
            <CardText className="row justify-content-center">
              <span className="col-auto">
                {this.props.user.username}% / {this.props.user.age}y
              </span>
              <span
                onClick={e => {
                  e.preventDefault();
                  this.props.postFavorite([
                    this.props.username,
                    this.props.user.username
                  ]);
                }}
                className="col-auto fa fa-heart fa-lg mouseover"
                style={{ color: "#E91E63" }}
              />
              {/* <span className="col-auto fa fa-close fa-lg mouseover" /> */}
              {this.props.user.last_login === null ? (
                <span
                  className="col-auto fa fa-exclamation-circle fa-lg mouseover"
                  onClick={() => {
                    //e.preventDefault();
                    window.confirm(
                      "Are you sure you report this user as fake user?"
                    ) && this.postBlacklist(this.props.user.username);
                    /* if (
                      window.confirm(
                        "Are you sure you report this user as fake user?"
                      )
                    ) {
                      this.postBlacklist(this.props.user.username);
                    } */
                  }}
                />
              ) : (
                <a />
              )}
            </CardText>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Profile</ModalHeader>
          <Profile
            profile={this.props.user}
            postFavorite={this.props.postFavorite}
            like={true}
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
  //console.log("props.users[0] === null" + props.users.length);
  const userlist =
    props.users.users.length === 0 ? (
      <h1>Result has not found</h1>
    ) : (
      props.users.users.map(user => {
        if (user !== undefined && user !== null) {
          return (
            /* <div key={user._id} className="col-12 col-md-3 m-1">
        <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-3 my-1">*/
            <div
              key={user._id}
              className="col-auto mx-auto col-md-6 col-lg-4 my-1"
            >
              <RenderUser
                user={user}
                postFavorite={props.postFavorite}
                postBlacklist={props.postBlacklist}
                username={props.username}
              />
            </div>
          );
        }
      })
    );

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
        <Filter
          filter={props.filter}
          fetchUsers={props.fetchUsers}
          likelist={props.likelist}
          fetchFilter={props.fetchFilter}
        />
        <div className="row">{userlist}</div>
      </div>
    );
};

export default Users;
``;
