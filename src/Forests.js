import React, { Component } from 'react';
import Container from './Container';

const Forests = props => {

  return(
    <div>
      <h1 className="page-title">Forests</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );
}

export default Forests;