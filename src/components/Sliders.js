import React, {Component} from "react";
import Navigation from "./navigation/Navigation";

class Sliders extends Component {
  state = {    
    genre: "age",
    genres: [{"id":1, "name":"age"}, {"id":2, "name":"distance"}, {"id":3, "name":"common tags"}, {"id":4, "name":"ratings"}],
    age: {
      label: "age",
      min: 0,
      max: 60,
      step: 1,
      value: { min: 20, max: 40 }
    },
    rating: {
      label: "rating",
      min: 0,
      max: 100,
      step: 10,
      value: { min: 80, max: 100 }
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
      value: { min: 1, max: 2 }
    }
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

  render() {
    return (
      <section className="slider" style={{display:"flex"}}>
        <Navigation 
          onChange={this.onChange} 
          onGenreChange={this.onGenreChange}          
          {...this.state} />
      </section>
    )
  }
}

export default Sliders;