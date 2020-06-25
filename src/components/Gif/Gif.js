import React, {Component} from 'react';
import {connect} from 'react-redux';
import GridListTileBar from "@material-ui/core/GridListTileBar";


class Gif extends Component {
    render () {
        return (
            <>
							gif
            </>

        );
    }
}




const mapStateToProps = (state) => {
    return {
        giphy: state.giphyReducer,
        favorites: state.favoritesReducer
    }
}

export default connect(mapStateToProps) (Gif);