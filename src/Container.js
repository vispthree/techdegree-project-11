import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config';
import GalleryItemList from './GalleryItemList';

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

export default Container;