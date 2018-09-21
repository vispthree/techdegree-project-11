import React from 'react';
import Container from './Container';

//Renders search results using Container

class Search extends React.Component {

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