import React, { Component } from 'react';
import Container from './Container';

const Dogs = props => {

  return(
    <div>
      <h1 className="page-title">Dogs</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );
}

export default Dogs;