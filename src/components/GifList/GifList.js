import React from "react";
import {connect} from "react-redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Gif from "../Gif/Gif";

class GifList extends React.Component {
  render() {
    return (
      <GridList cellHeight={200}>
        <GridListTile key="subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">{this.props.view}</ListSubheader>
        </GridListTile>
        {this.props.gifs[0] &&
          this.props.gifs.map((cur, i) => `gif-${i}`)}
      </GridList>
    );
  }
}

const mapStateToProps = (state) => {
  return { giphy: state.giphyReducer };
};

export default connect()(GifList);
