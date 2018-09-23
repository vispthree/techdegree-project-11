import React from 'react';
import GalleryItemHTML from './GalleryItemHTML';

const GalleryItemList = props => {

  const results = props.data;  
  
  //Map flickr query using GalleryItemHTML
  let images = results.map(image =>
    <GalleryItemHTML url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id} />
  );

  //Display no results message if no results found
  if (props.noResults !== false){
    return(
      <p>
        No results found
      </p>
    );
  }

  //Display gallery
  else {
    return(
      <ul className="gallery-item-list">
        {images}
      </ul>
    );
  }

}

export default GalleryItemList;