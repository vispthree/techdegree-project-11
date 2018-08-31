import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import apiKey from './config';
import {
  BrowserRouter,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

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
  <ul>
    <li><NavLink to="forests">forests</NavLink></li>
    <li><NavLink to="waterfalls">Waterfalls</NavLink></li>
    <li><NavLink to="dogs">Dogs</NavLink></li>
  </ul>
);

class Container extends React.Component {

  constructor() {
    super();
    this.state = {
      galleryItems: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
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
    return(

    <GalleryItemList data={this.state.galleryItems} />

    );
  }
}

const Forests = props => {

  return(
    <div>
      <h1>Forests</h1>
      <Container query={props.query} />      
    </div>
  );
}

const Waterfalls = props => {

  return(
    <div>
      <h1>Waterfalls</h1>
      <Container query={props.query} />      
    </div>
  );
}

const Dogs = props => {

  return(
    <div>
      <h1>Dogs</h1>
      <Container query={props.query} />      
    </div>
  );
}



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
  

    
    render() {    
      return (
        <BrowserRouter>
          <div className="App">
            <header className="App-header">            
              
              <Header />            

            </header>            

            <Route exact path="/" render={ () => <GalleryItemList data={this.state.galleryItems} />} />
            <Route path="/forests" render={ () => <Forests query="forests" />} /> {/*Pass search term with nav select*/}
            <Route path="/waterfalls" render={ () => <Waterfalls query="waterfalls" />} />
            <Route path="/dogs" render={ () => <Dogs query="shepherddog" />} />

          </div>
        </BrowserRouter>
      );
    }
}

export default App;