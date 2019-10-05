import React, { Component } from "react";
import Profile from "./Profile";
import Chatroom from "./Chatroom";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Modal,
  ModalHeader,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import classnames from "classnames";
import "./chat.css";

class RenderUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isChatOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.postDislike = this.postDislike.bind(this);
    /*     this.readChat = this.readChat.bind(this); */
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  /*   componentWillMount() {
    console.log("this.props.chatroom " + this.props.chatroom);
  } */

  toggleChat() {
    this.setState({
      isChatOpen: !this.state.isChatOpen
    });
  }
  postDislike = user => {
    //dispatch(favoritesLoading(true));
    return fetch(
      baseUrl + `users/add/dislike?user=${user[0]}&dislike=${user[1]}`
    )
      .then(response => {
        console.log("Dislike " + response.json());
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  render() {
    let bcolor = this.props.user.is_login ? "#76FF03" : "";
    //console.log("Render user chatroom:" + JSON.stringify(this.props));
    return (
      <div>
        <style></style>
        <Card style={{ maxWidth: "250px", borderColor: bcolor }}>
          <CardImg
            className="mouseover img-responsive"
            height="300px"
            overflow="hidden"
            style={{ objectFit: "cover" }}
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
              {this.props.chatroom ? (
                <span
                  className="col-auto fa fa-comments fa-lg mouseover"
                  onClick={e => {
                    e.preventDefault();
                    this.toggleChat();
                  }}
                >
                  {/* <Badge uchats={this.props.uchats} uchatn={this.props.uchats[this.props.chatroom]} /> */}
                  <span
                    className="badge badge-pill badge-danger"
                    style={{ height: "21px" }}
                  >
                    {this.props.uchats &&
                    this.props.uchats[this.props.chatroom] !== 0
                      ? this.props.uchats[this.props.chatroom]
                      : ""}
                  </span>
                </span>
              ) : (
                ""
              )}
              {this.props.like ? (
                <span
                  onClick={e => {
                    e.preventDefault();
                    this.props.postFavorite([
                      JSON.parse(localStorage.creds).username,
                      this.props.user.username
                    ]);
                  }}
                  className="col-auto fa fa-heart fa-lg mouseover"
                  style={{ color: "#E91E63" }}
                />
              ) : (
                ""
              )}
              {this.props.dislike ? (
                <span
                  className="col-auto fa fa-close fa-lg mouseover"
                  onClick={e => {
                    e.preventDefault();
                    this.postDislike([
                      JSON.parse(localStorage.creds).username,
                      this.props.user.username
                    ]);
                  }}
                />
              ) : (
                ""
              )}
            </CardText>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Profile</ModalHeader>
          <Profile
            profile={this.props.user}
            postFavorite={this.props.postFavorite}
            like={this.props.like}
          />
        </Modal>
        <Modal isOpen={this.state.isChatOpen} toggle={this.toggleChat}>
          <ModalHeader toggle={this.toggleChat} className="sc-header">
            Chat
          </ModalHeader>
          <Chatroom
            chatId={this.props.chatroom}
            to={this.props.user.username}
            fetchUchat={this.props.fetchUchat}
          />
        </Modal>
      </div>
    );
  }
}

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
    //this.renderList = this.renderList.bind(this);
  }

  /* renderList(user) {
    <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-4 my-1">
      <RenderUser
        user={user}
        postFavorite={this.props.postFavorite}
        username={this.props.username}
      />
    </div>;
  } */

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    //console.log("Connected props:" + JSON.stringify(this.props.chatrooms));
    const connectedlist =
      this.props.users.connected !== undefined
        ? this.props.users.connected.map(user => {
            return (
              <div
                key={user._id}
                className="col-9 mx-auto col-md-6 col-lg-4 my-1"
              >
                <RenderUser
                  user={user}
                  postFavorite={this.props.postFavorite}
                  username={this.props.username}
                  chatroom={this.props.chatrooms[user.username]}
                  fetchUchat={this.props.fetchUchat}
                  uchats={this.props.uchats}
                  like={false}
                  dislike={true}
                />
              </div>
            );
          })
        : null;
    const likedbylist =
      this.props.users.likedby !== undefined
        ? this.props.users.likedby.map(user => {
            return (
              <div
                key={user._id}
                className="col-9 mx-auto col-md-6 col-lg-4 my-1"
              >
                <RenderUser
                  user={user}
                  postFavorite={this.props.postFavorite}
                  username={this.props.username}
                  like={true}
                  dislike={false}
                />
              </div>
            );
          })
        : null;
    const likelist =
      this.props.users.like !== undefined
        ? this.props.users.like.map(user => {
            return (
              <div
                key={user._id}
                className="col-9 mx-auto col-md-6 col-lg-4 my-1"
              >
                <RenderUser
                  user={user}
                  postFavorite={this.props.postFavorite}
                  username={this.props.username}
                  dislike={true}
                />
              </div>
            );
          })
        : null;
    const checkedbylist =
      this.props.users.checkedby !== undefined
        ? this.props.users.checkedby.map(user => {
            return (
              <div
                key={user._id}
                className="col-9 mx-auto col-md-6 col-lg-4 my-1"
              >
                <RenderUser
                  user={user}
                  postFavorite={this.props.postFavorite}
                  username={this.props.username}
                  like={true}
                  dislike={false}
                />
              </div>
            );
          })
        : null;

    if (this.props.users.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.users.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.users.errMess}</h4>
          </div>
        </div>
      );
    } else
      return (
        <div className="container">
          <Nav tabs className="row">
            <NavItem className="col-auto">
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Connected
              </NavLink>
            </NavItem>
            <NavItem className="col-auto">
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Your fan
              </NavLink>
            </NavItem>
            <NavItem className="col-auto">
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Your Star
              </NavLink>
            </NavItem>
            <NavItem className="col-auto">
              <NavLink
                className={classnames({ active: this.state.activeTab === "4" })}
                onClick={() => {
                  this.toggle("4");
                }}
              >
                Your stalker
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="row">{connectedlist}</div>
            </TabPane>
            <TabPane tabId="2">
              <div className="row">{likedbylist}</div>
            </TabPane>
            <TabPane tabId="3">
              <div className="row">{likelist}</div>
            </TabPane>
            <TabPane tabId="4">
              <div className="row">{checkedbylist}</div>
            </TabPane>
          </TabContent>
        </div>
      );
  }
}
/* {this.props.uchats &&
  this.props.uchats[this.props.chatroom] !== 0
    ? this.props.uchats[this.props.chatroom]
    : ""} */
