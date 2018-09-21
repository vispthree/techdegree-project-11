import React from 'react';
import Container from './Container';

//Renders Waterfall images using Container

const Waterfalls = props => {

  return(
    <div>
      <h1 className="page-title">Waterfalls</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );

}

export default Waterfalls;