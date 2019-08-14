import React, { Component } from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import io from 'socket.io-client';
//const socket = io('http://localhost:3000');
const chat = io('https://localhost:3443/chat');
const noti = io('https://localhost:3443/noti');


function Message({ dish, deleteFavorite }) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}


export default class Chat extends Component {    
    constructor(props) {
        super(props);
        this.state = { 
          username: "test1",
          message: [],
          count: 0
         };
        this.increment = this.increment.bind(this);
        this.addMessage = this.addMessage.bind(this);
       // this.handleSubmit = this.handleSubmit.bind(this);
      }    
      
      componentDidMount() {
        /* chat.on('test1', (data) => {            
            console.log("getting data:" + JSON.stringify(data));
            this.setState({message: this.state.message.concat(data), count:this.state.count + 1});                                 */
        noti.on('test2', (data) => {            
            console.log("getting data:" + JSON.stringify(data));
            this.setState({message: this.state.message.concat(data), count:this.state.count + 1});                                
        });
      }

      increment (e) {
        noti.emit('message', ["test1", "test2", "Hello"]);        
        console.log(JSON.stringify(this.state));
        e.preventDefault();
      }
      addMessage () {
          //this.setState({message: this.state.message.concat("d")});          
      }      

    render() {
        
        return (
            <div>
                <ul>
                </ul>                
                {this.state.message}
                <input></input>
                <button onClick={this.addMessage}>Add Message</button>
                <button onClick={this.increment}>Increment</button>
            </div>
        )
    }
}

