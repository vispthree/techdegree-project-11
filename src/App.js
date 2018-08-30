import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import apiKey from './config';


const Header = props => (

  <div>
  <Search />
  <Navbar />
  </div>

);

const Search = props => (
  <p>search</p>
);


const Navbar = props => (
  <p>forests/waterfalls/dogs</p>
);

const GalleryItemHTML = props => (
  <li className="gallery-item-wrap">
    <img src={props.url} alt=""/>
  </li>
);

const GalleryItemList = props => {

  const results = props.data;
  let images = results.map(image =>
    <GalleryItemHTML url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} />
  );

  return(
    <ul className="gallery-item-list">
      {images}
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
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=forest&format=json&nojsoncallback=1`)
      .then(response => {         
        this.setState({
          galleryItems: response.data.photos.photo
        })
        console.log(`first title: ${this.state.galleryItems[0].title}`);
     })
     .catch(error => {
       console.log('Error fetching and parsing flickr data', error);
     });
  }

  render() {    
    return (
      <div className="App">
        <header className="App-header">

          <Header />

        </header>

          <GalleryItemList data={this.state.galleryItems} />

      </div>
    );
  }
}

export default App;