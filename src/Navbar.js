import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';


const Navbar = props => (
  <ul className="navbar">
    <NavLink to="/forests"><li>Forests</li></NavLink>
    <NavLink to="/waterfalls"><li>Waterfalls</li></NavLink>
    <NavLink to="/dogs"><li>Dogs</li></NavLink>
  </ul>
);

export default Navbar;