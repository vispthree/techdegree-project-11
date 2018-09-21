import React from 'react';
import Container from './Container';

//Renders Forest images using Container

const Forests = props => {

  return(
    <div>
      <h1 className="page-title">Forests</h1>
      <Container query={props.query} isSearch={false} />      
    </div>
  );

}

export default Forests;