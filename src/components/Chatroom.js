import React, { Component } from "react";
import {
  ModalBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import io from "socket.io-client";

//const chat = io("https://localhost:3443/chat");

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  pushChat(message) {
    return fetch(baseUrl + "chat/" + this.props.chatId, {
      method: "PUT",
      body: JSON.stringify({
        from: JSON.parse(localStorage.creds).username,
        to: this.props.to,
        message: message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        //console.log("pushChat" + response.comments);
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendRead(message) {
    return fetch(baseUrl + "chat/" + this.props.chatId, {
      method: "PUT",
      body: JSON.stringify({
        from: JSON.parse(localStorage.creds).username,
        to: this.props.to,
        message: message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("pushChat" + response.comments);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getChat() {
    return fetch(baseUrl + "chat/" + this.props.chatId)
      .then(response => response.json())
      .then(response => {
        this.setState({ comments: response.comments });
        //console.log("Chatroom" + JSON.stringify(response.comments));
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    this.setState({ chat: io("https://localhost:3443/chat") });
    this.getChat();
  }

  componentDidMount() {
    this.state.chat.on(this.props.chatId, data => {
      console.log(`chatRoom ${this.props.chatId} data: ${data}`);
      if (data.split(",")[0] === JSON.parse(localStorage.creds).username) {
        console.log("Excute checkUchat");
      }
      this.getChat();
      //this.props.fetchNoties(JSON.parse(localStorage.creds).username);
    });
  }

  componentWillUnmount() {
    this.state.chat.disconnect();
  }

  render() {
    const messageList = this.state.comments.map(comment => {
      return (
        <div key={comment.date}>
          {comment.from}, {comment.message}
        </div>
      );
    });
    return (
      <div>
        <ModalBody>
          {messageList}
          chatId: {this.props.chatId}
          <br />
          <input
            id="chatInput"
            type="text"
            placeholder="Search..."
            /* onChange={e => {
              this.setState({ message: e.target.value });
            }} */
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.pushChat(event.target.value);
                //this.setState({ message: "" });
                document.getElementById("chatInput").value = "";
              }
            }}
            value={this.state.message}
          />
        </ModalBody>
      </div>
    );
  }
}

export default Chatroom;
