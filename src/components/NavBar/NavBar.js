import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HashRouter as Route, NavLink, Router } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import './NavBar.css';

// NavBar Component

class NavBar extends Component {
  // setting local state
  state = {
    searchInput: '',
  }

  // submitSearch --> when the form is submitted,
  // (when someone searches a term)
  // this function will run and dispatch FETCH_GIPHY_GIFS
  // with the payload of the new state containing the search word
  // then we clear the input setting searchInput back to an empty string
  submitSearch = (event) => {
    event.preventDefault()
    this.props.dispatch({type: "FETCH_GIPHY_GIFS", payload: this.state.searchInput});
		this.setState({searchInput: ""});
		this.props.history.push("/search");
	}

  render() {
    return (
        <header>
          <h1 className="title">Giphylicious</h1>
            <div className="links">
              <NavLink to="/search"><button className="searchLink">Search</button></NavLink>
              <NavLink to="/favorites"><button className="favLink">Favorites</button></NavLink>
            </div>
          <form onSubmit={this.submitSearch}>
          <input type="text" value={this.state.searchInput} onChange={(event) => this.setState({searchInput: event.target.value})} className="searchIn"/>
          <button type="submit" className="submitButton">Submit</button>
          </form>
        </header>
    );
  }
}

export default withRouter(connect()(NavBar));