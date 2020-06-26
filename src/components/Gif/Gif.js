import React, { Component } from "react";
import { connect } from "react-redux";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class Gif extends Component {
  state = {
    showTileBar: false,
  };

  // onMouseEnter={() => setIsShown(true)}
  //onMouseLeave={() => setIsShown(false)}>

  render() {
    const { gif } = this.props;
    return (
      <GridListTile
        key={gif.img}
        cols={gif.cols || 1}
        onMouseEnter={() => this.setState({ showTileBar: true })}
        onMouseLeave={() => this.setState({ showTileBar: false })}
      >
        <img src={gif.url} alt={gif.title} />
        {this.state.showTileBar && (
          <GridListTileBar
            title={<><>Category</><select><option value="test">Test</option></select></>}
            actionIcon={
              <IconButton aria-label={`info about ${gif.title}`}>
                <FavoriteBorderIcon color="secondary" />
              </IconButton>
            }
          >
            test
          </GridListTileBar>
        )}
      </GridListTile>
    );
  }
}

export default connect()(Gif);
