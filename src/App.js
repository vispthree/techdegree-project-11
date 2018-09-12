import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import apiKey from './config';
import SearchForm from './SearchForm';
import {
  BrowserRouter,
  Route,
  NavLink,
} from 'react-router-dom';

const Navbar = props => (
  <ul>
    <li><NavLink to="forests">forests</NavLink></li>
    <li><NavLink to="waterfalls">Waterfalls</NavLink></li>
    <li><NavLink to="dogs">Dogs</NavLink></li>
  </ul>
);

class Container extends React.Component {

  state = {
    galleryItems: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
      .then(response => {         
        this.setState({
          galleryItems: response.data.photos.photo,
          loading: false
        })
        console.log(`first title: ${this.state.galleryItems[0].title}`);
    })
    .catch(error => {
      console.log('Error fetching and parsing flickr data', error);
    });
  }

  render() {
      let content;

      {
        if (this.state.loading) {
         content = <span>Loading...</span>;
        }
        else {
          content = <GalleryItemList data={this.state.galleryItems} />;
        }
      }
      return (
        <div>
          {content}
        </div>
      )
  }
}

const Search = props => {

  return(
    <div>
      <h1>Search</h1>
      <Container query={props.query} />      
    </div>
  );
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


  constructor() {
    super();
    this.state = {
      
      searchQuery: 'cats'
    };
  }


    getData = query => {
      console.log(`Search at top of app: ${query}`);
      this.setState({ searchQuery: query }, function(){
        console.log(`query state: ${this.state.searchQuery}`);
      });      
    }

    render() {    
      return (
        <BrowserRouter>
          <div className="App">
            <header className="App-header">            
              
              <SearchForm sendData={this.getData}/>
              <Navbar />         

            </header>            

            <Route exact path="/" render={ () => <Forests query="forests" />} />
            <Route path="/forests" render={ () => <Forests query="forests" />} /> {/*Pass search term with nav select*/}
            <Route path="/waterfalls" render={ () => <Waterfalls query="waterfalls" />} />
            <Route path="/dogs" render={ () => <Dogs query="shepherd dog" />} />
            <Route path="/search" render={ () => <Search query={this.state.searchQuery} />} />

          </div>
        </BrowserRouter>
      );
    }
}

export default App;
