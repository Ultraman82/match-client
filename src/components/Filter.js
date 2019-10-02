import React, { Component } from "react";
import {  
  Button,    
  Dropdown,
  DropdownToggle,
  DropdownMenu,  
} from "reactstrap";
import Navigation from "./navigation/Navigation";
import "./chat.css"

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {    
    this.setState({...this.props.filter, dropdownOpen:false})    
  }

  onGenreChange = event => {
    this.setState({ genre: event.target.value });
  }

  setGenres = genres => {
    this.setState({genres});
  }

  onChange = data => {
    this.setState({
      [data.type]: {
        ...this.state[data.type],
        value: data.value
      }
    });
  };

  handleSubmit () {
    console.log(JSON.stringify("this.state from filter " + JSON.stringify(this.state)));        
    this.props.fetchFilter(this.state);       
    if (localStorage.length === 0) {
      alert("Login First");
    } else {
      this.props.fetchUsers({ ...this.state, username:JSON.parse(localStorage.creds).username, likelist:this.props.likelist.like});
    }
  }
  toggle() {
    console.log("toggle excuted");
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {    
    return (
      <div className="container" style={{ margin: "10px" }}>
        <div className="row">
          <div className="col-12">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle color="warning">Filter / Sort</DropdownToggle>
              <DropdownMenu className="text-center">
              <section className="slider" style={{display:"flex"}}>
                <Navigation 
                  onChange={this.onChange} 
                  onGenreChange={this.onGenreChange}          
                  {...this.state} />                  
              </section>
              <Button color="warning" style={{marginTop:"0px"}}onClick={e => {this.handleSubmit();}}>
                  Confirm
                </Button>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
