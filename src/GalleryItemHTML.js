import React from 'react';

const GalleryItemHTML = props => (
  //Generates html for each image based on Flickr API call
  <li className="gallery-item-wrap">
    <img src={props.url} alt=""/>
  </li>
);

export default GalleryItemHTML;