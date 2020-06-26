import React, { Component } from "react";
import { connect } from "react-redux";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

class Gif extends Component {
  state = {
    showTileBar: false,
  };

  sendCategoryID = (event) => {
    this.props.dispatch({
      type: "CAT_ID_TO_FAVS",
      payload: { categoryID: event.target.value, gifId: this.props.gif.id },
    });
  };

  toggleFavorite = () => {
		
		if(this.props.gif.isFavorited) {
			this.props.dispatch({type: 'DELETE_FAVORITE', payload: this.props.gif});
		} else {
			this.props.dispatch({type: 'ADD_FAVORITE', payload: this.props.gif});
		}
	}

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
            title={
              gif.isFavorited ? (
                <>
                  <>Category</>
                  <select value={gif.category_id || undefined} onChange={this.sendCategoryID} >
                    {this.props.categories?.map((category) => (
                      <option
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                gif.title
              )
            }
            actionIcon={
              <IconButton aria-label={`info about ${gif.title}`}>
                {this.props.gif.isFavorited ? (
                  <FavoriteIcon
                    onClick={this.toggleFavorite}
                    color="secondary"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={this.toggleFavorite}
                    color="secondary"
                  />
                )}
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

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
  };
};

export default connect(mapStateToProps)(Gif);
