import React, { Component } from 'react';

const GalleryItemHTML = props => (
  <li className="gallery-item-wrap">
    <img src={props.url} alt=""/>
  </li>
);

export default GalleryItemHTML;