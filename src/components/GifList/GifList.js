import React from "react";
import {connect} from "react-redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Gif from "../Gif/Gif";
import './GifList.css';

class GifList extends React.Component {
  render() {
    return (
      <GridList cellHeight={200} cols={5}>
        <GridListTile key="subheader" cols={5} style={{ height: "auto" }}>
          <ListSubheader component="div">{this.props.view}</ListSubheader>
        </GridListTile>
        {this.props.gifs[0] && this.props.gifs.map((cur, i) => <Gif gif={cur} />)}
      </GridList>
    );
  }
}


export default connect()(GifList);
