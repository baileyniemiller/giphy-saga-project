import React from "react";
import GifList from "../GifList/GifList";
import { connect } from "react-redux";

class Favorites extends React.Component {
	componentDidMount() {
		this.props.dispatch({type: "FETCH_FAV_GIFS"})
	}

  render() {
    return (
      <>
        <GifList gifs={this.props.favs} view="Favorites" />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { favs: state.favoritesReducer };
};

export default connect(mapStateToProps)(Favorites);
