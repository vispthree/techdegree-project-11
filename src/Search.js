import React, { Component } from 'react';
import Container from './Container';

class Search extends React.Component {

  constructor() {
    super();
    this.state = {

      query: ''
    };
  } 

  render() {
    
    return(
      
      <div>
        <h1 className="page-title">Search</h1>
        <Container query={this.props.query} isSearch={true} />      
      </div>
    );
  }
}

export default Search;