import React, { Component } from "react";
import { connect } from "react-redux";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

class Gif extends Component {
  render() {
		const {gif} = this.props;
    return (
      <GridListTile key={gif.img} cols={gif.cols || 1}>
        <img src={gif.url} alt={gif.title} />
      </GridListTile>
    );
  }
}

export default connect()(Gif);
