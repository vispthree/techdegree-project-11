import React from 'react';
import axios from 'axios';
import apiKey from './config';
import GalleryItemList from './GalleryItemList';

class Container extends React.Component {

  constructor() {
    super();
    this.state = {
      //Holds images from flickr api call
      galleryItems: [],
      //Sets the app to loading until updated
      loading: true,
      //If set to true, use is informed search produced no results
      noResults: false
    };
  }

  //Store flicky API call as galleryItems in state, if rendering a predefined (non-search) route then log error on failure
  //If rendering the search route then display no results message on failure
  componentDidMount() {
    if (this.props.isSearch === false){
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
        .then(response => {         
          this.setState({
            galleryItems: response.data.photos.photo,
            loading: false
          })          
      })
      .catch(error => {
        console.log('Error fetching and parsing flickr data', error);
      });
  }
    else if(this.props.isSearch === true){
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
          .then(response => {         
            this.setState({
              galleryItems: response.data.photos.photo,
              loading: false,
              noResults: false
            });        
        })
        .catch(error => {
          this.setState({            
            noResults: true
          });
        });
    }
  }

  //Same as componentDidMount but re-renders route if query is updated
  componentDidUpdate(prevProps) {
    console.log('container search updated');
    if (this.props.query !== prevProps.query){
      if (this.props.isSearch === false){
          axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
            .then(response => {         
              this.setState({
                galleryItems: response.data.photos.photo,
                loading: false
              });
              console.log(`first title: ${this.state.galleryItems[0].title}`);
          })
          .catch(error => {
            console.log('Error fetching and parsing flickr data', error);
          });
      }
        else if(this.props.isSearch === true){
            axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.query}&format=json&nojsoncallback=1`)
              .then(response => {         
                this.setState({
                  galleryItems: response.data.photos.photo,
                  loading: false,
                  noResults: false
                });
                console.log(`first title: ${this.state.galleryItems[0].title}`);
            })
            .catch(error => {
              this.setState({            
                noResults: true
              });
            });
        }
    }
  }

  //If loading display loading text, else display gallery or no search results message
  render() {
      let content;

      if (this.state.loading) {
       content = `Loading...`;
      }
      else {
        content = <GalleryItemList data={this.state.galleryItems} noResults={this.state.noResults} />;
      }

      return (
        <div>
          {content}
        </div>
      )
  }
}

export default Container;