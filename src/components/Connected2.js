import React, { Component } from "react";
import Profile from "./Profile";
import Chatroom from "./Chatroom";
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
  ModalHeader,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import classnames from "classnames";

class RenderUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isChatOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggleChat() {
    this.setState({
      isChatOpen: !this.state.isChatOpen
    });
  }

  render() {
    console.log("Render user chatroom:" + this.props.chatroom);
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
              <div className="col-auto">{this.props.user.username}</div>
              {this.props.chatroom ? (
                <span
                  className="col-auto fa fa-comments fa-lg mouseover"
                  onClick={e => {
                    e.preventDefault();
                    this.toggleChat();
                  }}
                />
              ) : (
                <span
                  onClick={e => {
                    e.preventDefault();
                    alert(
                      `We sent message to ${this.props.user.username}. Lets see you would be liked!`
                    );
                    this.props.postFavorite([
                      JSON.parse(localStorage.creds).username,
                      this.props.user.username
                    ]);
                  }}
                  className="col-auto fa fa-heart fa-lg mouseover"
                  style={{ color: "#E91E63" }}
                />
              )}
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
        <Modal isOpen={this.state.isChatOpen} toggle={this.toggleChat}>
          <ModalHeader toggle={this.toggleChat}>Chat</ModalHeader>
          <Chatroom
            chatId={this.props.chatroom}
            to={this.props.user.username}
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
    console.log("Connected props:" + JSON.stringify(this.props.chatrooms));
    const connectedlist = this.props.users.connected.map(user => {
      return (
        <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-4 my-1">
          <RenderUser
            user={user}
            postFavorite={this.props.postFavorite}
            username={this.props.username}
            chatroom={this.props.chatrooms[user.username]}
            /* chatroom={
              this.props.chatrooms[user.username] !== undefined
                ? this.props.chatrooms[user.username]
                : null
            } */
          />
        </div>
      );
    });
    const likedbylist = this.props.users.likedby.map(user => {
      return (
        <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-4 my-1">
          <RenderUser
            user={user}
            postFavorite={this.props.postFavorite}
            username={this.props.username}
          />
        </div>
      );
    });
    const checkedbylist = this.props.users.checkedby.map(user => {
      return (
        <div key={user._id} className="col-9 mx-auto col-md-6 col-lg-4 my-1">
          <RenderUser
            user={user}
            postFavorite={this.props.postFavorite}
            username={this.props.username}
          />
        </div>
      );
    });

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
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Connected
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Your fan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
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
              <div className="row">{checkedbylist}</div>
            </TabPane>
          </TabContent>
        </div>
      );
  }
}
