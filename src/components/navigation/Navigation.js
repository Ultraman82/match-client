// Navigation.js

import React from "react";
import "./Navigation.css";
import Selection from "./Selection";
import Slider from './Slider.js';

class Navigation extends React.Component {
  /* componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => {
        this.props.setGenres(data.genres);
        console.log("data.genres" + data.genres);

      })
      .catch(error => console.log(error));
  } */

  render() {
    const { comtags, genre, genres, onGenreChange, onChange, age, fame, distance } = this.props;
    return (
      <section className="navigation">        
        <Slider data={age} onChange={onChange} />
        <Slider data={fame} onChange={onChange} />
        <Slider data={distance} onChange={onChange} /> 
        <Slider data={comtags} onChange={onChange} /> 
        <Selection
          genre={genre}
          genres={genres}
          onGenreChange={onGenreChange}
        />
      </section>
    )
  }
}

export default Navigation;
