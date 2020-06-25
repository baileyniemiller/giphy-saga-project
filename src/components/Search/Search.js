import React, { Component } from "react";
import GifList from "../GifList/GifList.js";
import { connect } from "react-redux";

class Search extends Component {
  render() {
    return (
      <div>
        <GifList gifs={this.props.giphy} view="Search Results" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { giphy: state.giphyReducer };
};

export default connect(mapStateToProps)(Search);
