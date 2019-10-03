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
//import {Launcher} from 'react-chat-window'
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

  readChat = () => {
    return fetch(baseUrl + `chat/unread?chatId=${this.props.chatId}`)
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
      .then(response => {
        //console.log("fetchProfile:" + profile);
        //console.log("Profile: " + JSON.stringify(response));
      })
      .catch(error => console.log(error.message));
  };

  getChat() {
    return fetch(baseUrl + "chat/" + this.props.chatId)
      .then(response => response.json())
      .then(response => {
        //console.log("response.comments " + response.comments);
        this.setState({ comments: response.comments });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    console.log("chatId" + this.props.chatId);
    this.setState({ chat: io("https://localhost:3443/chat") });
    this.getChat();
    this.readChat();
    localStorage.inChatroom = true;
  }

  componentDidMount() {
    this.state.chat.on(this.props.chatId, data => {
      console.log(`chatRoom ${this.props.chatId} data: ${data}`);
      if (data.split(",")[0] === JSON.parse(localStorage.creds).username) {
        console.log("Excute checkUchat");
        this.readChat();
      }
      this.getChat();
      //this.props.fetchNoties(JSON.parse(localStorage.creds).username);
    });
  }

  componentWillUnmount() {
    this.state.chat.disconnect();
    console.log(localStorage.chatrooms.split(","));
    this.props.fetchUchat(localStorage.chatrooms.split(","));
    //console.log("fetchUchat: " + this.props.fetchUchat);
    localStorage.inChatroom = false;
  }

  render() {
    //console.log("comment " + JSON.stringify(this.state.comments));
    const messageList = this.state.comments.map(comment => {
      let sent = "sc-message--content received";
      if (comment.to == this.props.to) {
        sent = "sc-message--content sent";
      }
      return (
        <div key={comment.date} className="sc-message">
          <div className={sent}>
            <div className="sc-message--text">{comment.message}</div>
          </div>
        </div>
      );
    });
    return (
      <ModalBody className="sc-chat--window">
        <div className="sc-message-list">{messageList}</div>
        <div className="sc-user-input">
          <input
            id="chatInput"
            type="text"
            placeholder="Write message..."
            className="sc-user-input--text"
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
        </div>
        {/* <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      /> */}
      </ModalBody>
    );
  }
}

export default Chatroom;
