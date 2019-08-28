import React from 'react';
import ImageCard from './ImageCard';

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      profile: null,
      gallery: [],
      images: null
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.onChangeGallery = this.onChangeGallery.bind(this);
  }

  componentWillMount() {    
    this.setState({images:this.props.gallery});    
    console.log(JSON.stringify(this.props));
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload();
  }

  onChangeProfile(e) {        
    this.setState({profile:e.target.files[0]});
    console.log(e.target.files[0]);
    e.preventDefault();
  }
  onChangeGallery(e) {
    this.setState({gallery:e.target.files});    
    console.log(this.state);
    e.preventDefault();
  }

  fileUpload(){
    let data = new FormData();       
    for(var x = 0; x<this.state.gallery.length; x++) {
      data.append('gallery', this.state.gallery[x]);
    }
    //data.append('gallery', this.state.gallery);
    data.append('profile', this.state.profile);
    data.append('username', this.props.username);
    console.log(this.state);
    const url = 'https://localhost:3443/image';

    fetch(url, {
        mode: 'no-cors',
        method: "POST",
        body: data
      })
    .then(res => console.log(JSON.stringify(res)))
    .then(() => window.location.href = 'localhost:3001/home');
  }

  render() {
    let images;
    if(this.state.images !== [] && this.state.images.length > 0) {
      images = this.state.images.map( i => {
        return (
          <ImageCard key={this.state.images.indexOf(i)} alt={i} src={'https://localhost:3443/'+i} date={i.replace("images/edgar2",'').replace('.png', '')} />
        );
      });
    } else {
      images = <h2 className="subtitle">No images :(</h2>;
    }

    return (
      <section className="section">
        <div className="container  is-fluid">
          <h1 className="title">Photo Gallery</h1>
          <div className="file is-info has-name is-fullwidth">
            <label className="file-label">
              <input className="file-input" type="file" name="profile" onChange={this.onChangeProfile} />Profile              
              <input className="file-input" type="file" name="gallery" multiple onChange={this.onChangeGallery} />Gallery
              <span>
                
              </span>
            </label>
          </div>
          <br/>
          {/* <div className="file is-info has-name is-fullwidth">
            <label className="file-label">
              <input className="file-input" type="file" name="gallery" multiple onChange={this.onChangeGallery} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose Gallerly
                </span>
              </span>
              <span className="file-name">
                {this.state.gallery}
              </span>
            </label>
          </div>
          <br/> */}
          <button className="button is-primary" onClick={this.onFormSubmit} type="submit">Upload</button>
        </div>
        <hr/>
        <div className="container is-fluid">
          <div className="columns is-multiline">
            {images}
          </div>
        </div>
      </section>
    );
  }
 }

export default Uploader;