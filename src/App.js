import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import Forests from './Forests';
import Waterfalls from './Waterfalls';
import Dogs from './Dogs';
import NotFound from './NotFound';
import Search from './Search';
import Navbar from './Navbar';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';



class App extends Component {

  constructor() {
    super();
    this.state = {      
      searchQuery: ''
    };
  }

  getData = query => {
    console.log(`Search at top of app: ${query}`);
    this.setState({ searchQuery: query }, function(){
      console.log(`query state at to of app: ${this.state.searchQuery}`);        
    });      
  }

  render() {    
    return (
      <BrowserRouter>
        <div className="App">

          <header className="header">
            <SearchForm sendData={this.getData}/>
            <Navbar />         
          </header>            

          <Switch>
            <Route exact path="/" render={ () => <Forests query="forests" />} />
            <Route path="/forests" render={ () => <Forests query="forests" />} /> {/*Pass search term with nav select*/}
            <Route path="/waterfalls" render={ () => <Waterfalls query="waterfalls" />} />
            <Route path="/dogs" render={ () => <Dogs query="shepherd dog" />} />
            <Route path="/search" render={ () => <Search query={this.state.searchQuery} />} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
