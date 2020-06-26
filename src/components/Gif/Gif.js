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
    isFavorited: false,
  };

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
              this.state.isFavorited ? (
                <>
                  <>Category</>
                  <select>
                    {this.props.categories?.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </>
              ) : (
                gif.title
              )
            }
            actionIcon={
              <IconButton aria-label={`info about ${gif.title}`}>
                {this.state.isFavorited ? (
                  <FavoriteIcon
                    onClick={() => this.setState({ isFavorited: false })}
                    color="secondary"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => this.setState({ isFavorited: true })}
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
