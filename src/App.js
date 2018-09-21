import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import apiKey from './config';
import SearchForm from './SearchForm';
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

const Navbar = props => (
  <ul className="navbar">
    <NavLink to="/forests"><li>Forests</li></NavLink>
    <NavLink to="/waterfalls"><li>Waterfalls</li></NavLink>
    <NavLink to="/dogs"><li>Dogs</li></NavLink>
  </ul>
);

class Container extends React.Component {

  constructor() {
    super();
    this.state = {
      galleryItems: [],
      loading: true,
      noResults: false
    };
  }


  componentDidMount() {
    if (this.props.isSearch == false){
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
    else if(this.props.isSearch == true){
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
          .then(response => {         
            this.setState({
              galleryItems: response.data.photos.photo,
              loading: false,
              noResults: false
            })
            console.log(`first title: ${this.state.galleryItems[0].title}`);
        })
        .catch(error => {
          this.setState({            
            noResults: true
          })
        });
    }
  }

  componentDidUpdate(prevProps) {
    console.log('container search updated');
    if (this.props.query !== prevProps.query){
      if (this.props.isSearch == false){
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
        else if(this.props.isSearch == true){
            axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
              .then(response => {         
                this.setState({
                  galleryItems: response.data.photos.photo,
                  loading: false,
                  noResults: false
                })
                console.log(`first title: ${this.state.galleryItems[0].title}`);
            })
            .catch(error => {
              this.setState({            
                noResults: true
              })
            });
        }
    }
  }

  render() {
      let content;

      {
        if (this.state.loading) {
         content = <span>Loading...</span>;
        }
        else {
          content = <GalleryItemList data={this.state.galleryItems} noResults={this.state.noResults} />;
        }
      }
      return (
        <div>
          {content}
        </div>
      )
  }
}

class Search extends React.Component {

  constructor() {
    super();
    this.state = {

      query: ''
    };
  } 

  render() {
    
    return(
      
      <div>
        <h1 className="page-title">Search</h1>
        <Container query={this.props.query} isSearch={true} />      
      </div>
    );
  }
}

const Forests = props => {

  return(
    <div>
      <h1 className="page-title">Forests</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );
}

const Waterfalls = props => {

  return(
    <div>
      <h1 className="page-title">Waterfalls</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );
}

const Dogs = props => {

  return(
    <div>
      <h1 className="page-title">Dogs</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );
}

const NotFound = props => {

  return(
    <div>
      <h1 className="page-title">404</h1>
      <p>Page not found!</p>     
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

  if (props.noResults == true){
    return(
      <p>
        No results found
      </p>
    );
  }

  else {
    return(
      <ul className="gallery-item-list">
        {images}
      </ul>
    );
  }

}

class App extends Component {


  constructor() {
    super();
    this.state = {
      
      searchQuery: ''
    };
  }


    getData = query => {
      console.log(`Search at top of app: ${query}`);
      this.setState({ searchQuery: query }, function(){
        console.log(`query state at to of app: ${this.state.searchQuery}`);
        
      });      
    }

    render() {    
      return (
        <BrowserRouter>
          <div className="App">
            <header className="header">            
              
              <SearchForm sendData={this.getData}/>
              <Navbar />         

            </header>            

            <Switch>
              <Route exact path="/" render={ () => <Forests query="forests" />} />
              <Route path="/forests" render={ () => <Forests query="forests" />} /> {/*Pass search term with nav select*/}
              <Route path="/waterfalls" render={ () => <Waterfalls query="waterfalls" />} />
              <Route path="/dogs" render={ () => <Dogs query="shepherd dog" />} />
              <Route path="/search" render={ () => <Search query={this.state.searchQuery} />} />
              <Route component={NotFound} />
            </Switch>

          </div>
        </BrowserRouter>
      );
    }
}

export default App;
