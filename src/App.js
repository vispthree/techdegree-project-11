import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import apiKey from './config';

const GalleryItemHTML = props => (
  <li className="gallery-item-wrap">
    <img src={props.url} alt=""/>
  </li>
);

const GalleryItemList = props => {

  const results = props.data;
  let images = results.map(image =>
    <GalleryItemHTML url={`https://www.flickr.com/photos${image.owner}/${image.id}`} />
  );

  return(
    <ul className="gallery-item-list">
      {GalleryItemHTML}
    </ul>
  );
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      galleryItems: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=trees&format=json&nojsoncallback=1`)
      .then(response => {         
        this.setState({
          galleryItems: response.data.photos
        })
        console.log(`first title: ${this.state.photo[0].title}`);
     })
     .catch(error => {
       console.log('Error fetching and parsing flickr data', error);
     });
  }

  render() {    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          <GalleryItemList data={this.state.galleryItems} />

      </div>
    );
  }
}

export default App;