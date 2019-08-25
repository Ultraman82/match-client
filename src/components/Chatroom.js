import React, { Component } from "react";
import { ModalBody } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  componentWillMount() {
    return fetch(baseUrl + "users/add/like", {
      body: JSON.stringify({ user: users[0], data: users[1] }),
      headers: {
        "Content-Type": "application/json"
      }
      //credentials: "same-origin"
    })
      .then(response => response.json())
      .then(response => {
        console.log("Favorite Added", response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <ModalBody>{this.props.chatId}</ModalBody>
      </div>
    );
  }
}

export default Chatroom;
