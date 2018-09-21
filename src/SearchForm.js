import React from 'react';
import searchglass from './images/search.svg';
import {
  withRouter,
} from 'react-router-dom';

class SearchForm extends React.Component {

  // Initial state contains no search term
  state = {
    searchText: ''
  }

  // Search state is updated when search input is ubdated
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });    
  }

  // Blocks page reload on submit, triggers performSearch, resets search input field
  onSubmit = e => {
    e.preventDefault();
    this.performSearch(this.state.searchText);
    e.currentTarget.reset();
  }

  // Sends query to top of app, redirects to search display route
  performSearch(query){    
    this.props.sendData(query);
    this.props.history.push('/search');      
  }

  // Displays search input form
  render() {
      return(
        <form className="search--form" onSubmit={this.onSubmit} >
          <input type="search"
            onChange={this.onSearchChange}
            name="search"
            ref={(input) => this.query = input}
            placeholder="Search" />
          <button type="submit" id="submit" className="search--button"><img src={searchglass} alt="" height="15px" width="15px" /> </button>        
        </form>
      );
  }

}

export default withRouter(SearchForm);