import React from 'react';
import GifList from "../GifList/GifList";
import { connect } from 'react-redux';

class Favorites extends React.Component {

	render() {
		return (
			<>
				Favorites content
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {favs: state.favoritesReducer}
}

export default connect(mapStateToProps)(Favorites);