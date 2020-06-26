import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../NavBar/NavBar.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import Search from "../Search/Search";

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_CATEGORIES" });
  };

  render() {
    return (
      <div>
        <Router>
          <Route path="/">{<NavBar />}</Route>
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/search" component={Search} />
        </Router>
      </div>
    );
  }
}

export default connect()(App);
