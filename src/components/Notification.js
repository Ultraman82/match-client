import React, { Component } from "react";
import { Media, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Profile from "./Profile";

//import { Link } from 'react-router-dom';
import { baseUrl } from "../shared/baseUrl";
//import { Loading } from './LoadingComponent';
import io from "socket.io-client";
const noti = io("https://localhost:3443/noti");

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      profile: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    //this.RenderProfile = this.RenderProfile.bind(this);
  }

  componentDidMount() { }

  componentWillMount() {
    this.setState({ profile: this.props.profile });
    //console.log("this.props.noti: " + JSON.stringify(this.state.noties));
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  fetchProfile = username => {
    return fetch(baseUrl + `users/edit/${username}`)
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        error => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then(response => response.json())
      .then(profile => {
        //console.log("fetchProfile:" + profile);
        console.log("Profile: " + JSON.stringify(profile));
        this.setState({ profile: profile });
        this.toggleModal();
      })
      .catch(error => console.log(error.message));
  };

  RenderNoti(noti) {
    //console.log(`noti: ${JSON.stringify(noti)} \nid: ${id}`)
    let bcolor = noti.unread ? "#76FF03" : "";

    return (
      <div
        className="card"
        style={{ borderColor: bcolor }}
        onClick={e => {
          if (noti.unread) this.props.checkNoti(this.props.noti._id, noti.date);
          e.preventDefault();
        }}
      >
        <Media tag="li">
          <Media left middle>
            <Media
              style={{ height: "100px" }}
              object
              src={baseUrl + noti.image}
              alt={noti.from}
            />
          </Media>
          <Media body className="ml-5">
            <Media heading>{noti.from}</Media>
            <p>{noti.type}</p>

            <span
              className="col-auto fa fa-address-card fa-lg"
              style={{ color: "#6A1B9A" }}
              onClick={e => {
                this.fetchProfile(noti.from);
                //this.props.fetchProfile(noti.from);
                e.preventDefault();
              }}
            />
          </Media>
        </Media>
      </div>
    );
  }
  render() {    
    const noties =
      this.props.noti !== null && this.props.noti.comments.length !== 0 ? (
        this.props.noti.comments.map(noti => {
          return (
            <div
              key={this.props.noti.comments.indexOf(noti)}
              className="col-12 mt-5"
            >
              {this.RenderNoti(noti)}
            </div>
          );
        })
      ) : (
          <h1>No notification</h1>
        );
    return (
      <div>
        {noties}
        {/* <Profile profile={this.state.profile} isModalOpen={this.state.isModalOpen}/> */}
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Profile</ModalHeader>
            <Profile
              profile={this.state.profile}
              postFavorite={this.props.postFavorite}
            />
          </Modal>
        </div>
      </div>
    );
  }
}
