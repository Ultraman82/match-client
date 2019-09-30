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
    this.state = {
      dropdownOpen: false,
      genre: "age",
      genres: [{"id":1, "name":"age"}, {"id":2, "name":"distance"}, {"id":3, "name":"common tags"}, {"id":4, "name":"ratings"}],
      age: {
        label: "age",
        min: 0,
        max: 60,
        step: 1,
        value: { min: 20, max: 40 }
      },
      fame: {
        label: "fame",
        min: 0,
        max: 100,
        step: 10,
        value: { min: 0, max: 100 }
      },
      distance: {
        label: "distance",
        min: 0,
        max: 300,
        step: 10,
        value: { min: 0, max: 120 }
      },
      comtags: {
        label: "comtags",
        min: 0,
        max: 10,
        step: 1,
        value: { min: 0, max: 1 }
      },
      sortby:"age",
      tags:["tag1","tag2"]
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    //this.setState({...this.props.fi})
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
    this.toggle();    
    if (localStorage.length === 0) {
      alert("Login First");
    } else {
      this.props.fetchUsers({ ...this.state, username:JSON.parse(localStorage.creds).username, likelist:this.props.likelist.like});
    }
  }
  toggle() {
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
              <DropdownToggle color="primary">Filter / Sort</DropdownToggle>
              <DropdownMenu>                
              <section className="slider" style={{display:"flex"}}>
                <Navigation 
                  onChange={this.onChange} 
                  onGenreChange={this.onGenreChange}          
                  {...this.state} />
              </section>
                    <Button type="submit" color="primary" onClick={e => {e.preventDefault();this.handleSubmit()}}>
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

/* 

<Button onClick={e => this.toggle(e)} color="primary">
          Filter
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggle}
          className="col-md-6"
        >
          <ModalHeader toggle={this.toggle}>Filter</ModalHeader>
</Modal>

              
              */

export default Filter;
