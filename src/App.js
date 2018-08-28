import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import apiKey from './config';
class App extends Component {

  constructor() {
    super();
    this.state = {
      galleryItems: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=trees&format=json`)
      .then((response) => {
        this.setState({ galleryItems: response.data });
        console.log(this.state.galleryItems);      
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
