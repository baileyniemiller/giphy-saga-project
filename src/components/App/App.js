import React, { Component } from 'react';
import {connect} from "react-redux";


class App extends Component {
	state = {
		searchInput: "",
	}

	submitSearch = (event) => {
		event.preventDefault()
		this.props.dispatch({type: "FETCH_GIPHY_GIFS", payload: this.state.searchInput});
		this.setState({searchInput: ""});
	}

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
				<form onSubmit={this.submitSearch}>
				<input type="text" value={this.state.searchInput} onChange={(event) => this.setState({searchInput: event.target.value})}/>
				<button type="submit">Submit</button>
				</form>
			</div>
    );
  }
  
}

export default connect()(App);
