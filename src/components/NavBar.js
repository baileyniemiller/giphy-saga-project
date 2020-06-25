import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
        <header>
          <h1>Giphylicious</h1>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </header>
    );
  }
}

export default connect()(withRouter((NavBar)));