import React, { Component } from 'react';
import {connect} from "react-redux";
import NavBar from '../NavBar/NavBar.js';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import Search from "../Search/Search";


class App extends Component {
	// state = {
	// 	searchInput: "",
	// }

	// submitSearch = (event) => {
	// 	event.preventDefault()
	// 	this.props.dispatch({type: "FETCH_GIPHY_GIFS", payload: this.state.searchInput});
	// 	this.setState({searchInput: ""});
	// }

  render() {
    return (
      <div>
				<Router>
					<Route path="/">{<NavBar />}</Route>
					<Route exact path='/favorites' component={Favorites} />
					<Route exact path='/search' component = {Search} />
				
				
				{/* {this.props.giphy[0] && this.props.giphy.map((cur, i) => {
					return <img src={cur.url} />;
				})} */}

				
				</Router>
			</div>
    );
  }
  
}

const mapStateToProps = (state) => {
	return {giphy: state.giphyReducer};
}

export default connect(mapStateToProps)(App);
