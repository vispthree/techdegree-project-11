import React, { Component } from 'react';
import GalleryItemHTML from './GalleryItemHTML';

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

export default GalleryItemList;