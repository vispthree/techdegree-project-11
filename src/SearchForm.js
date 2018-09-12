import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

class SearchForm extends React.Component {

  state = {
    searchText: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
    console.log('search changed');
  }

  onSubmit = e => {
    e.preventDefault();
    /*<Dogs query={this.state.searchText} /> */    

    this.performSearch(this.state.searchText);

    e.currentTarget.reset();
  }

  performSearch(query){

    console.log(`search term rendered: ${query}`);
    this.props.sendData(query);

    this.props.history.push('/search');
      
    
  }

  render() {
      return(
        <form className="search--form" onSubmit={this.onSubmit} >
          <input type="search"
            onChange={this.onSearchChange}
            name="search"
            ref={(input) => this.query = input}
            placeholder="Search" />
          <button type="submit" id="submit" className="search--button">O</button>        
        </form>
      );
  }

}

export default withRouter(SearchForm);