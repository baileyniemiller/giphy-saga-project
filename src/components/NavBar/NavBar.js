import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { HashRouter as Route, NavLink, Router } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "./NavBar.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem"
import Grid from '@material-ui/core/Grid';

// NavBar Component

class NavBar extends Component {
  // setting local state
  state = {
		searchInput: "",
		anchorEl: null
  };

  // submitSearch --> when the form is submitted,
  // (when someone searches a term)
  // this function will run and dispatch FETCH_GIPHY_GIFS
  // with the payload of the new state containing the search word
  // then we clear the input setting searchInput back to an empty string
  submitSearch = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: "FETCH_GIPHY_GIFS",
      payload: this.state.searchInput,
    });
    this.setState({ searchInput: "" });
    this.props.history.push("/search");
	};
	
	openMenu = (event) => {
		this.setState({anchorEl: event.target})
	}

	handleMenuClick = (path) => {
		this.setState({anchorEl: null});
		this.props.history.push(path);
	}

  render() {
    return (
      <AppBar position="static">
        <Grid>
        <Toolbar>
          {/* <NavLink to="/search"><Typography className="title" variant="h6" noWrap>
            Search
          </Typography></NavLink> */}
          {/* <NavLink to="/favorites"><Typography className="title" variant="h6" noWrap>
            Favorites
          </Typography></NavLink>*/}
          <IconButton
            edge="start"
            className="button"
            color="inherit"
						aria-label="open drawer"
						aria-controls="navbar-menu"
						onClick={this.openMenu}
          >
            <MenuIcon />
          </IconButton>
					<Menu
						id="navbar-menu"
						anchorEl={this.state.anchorEl}
						keepMounted
						open={Boolean(this.state.anchorEl)}
						>
						<MenuItem onClick={() => this.handleMenuClick("/search")}>Search</MenuItem>
						<MenuItem onClick={() => this.handleMenuClick("/favorites")}>Favorites</MenuItem>
					</Menu>
          <Grid item={3}>
          <Typography className="title" variant="h3" noWrap>
            Giphylicious
          </Typography>
          </Grid>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <Grid item xs={6} >
            <InputBase
              placeholder="Search…"
              classes={{
                root: "inputRoot",
                input: "inputInput",
              }}
              inputProps={{ "aria-label": "search" }}
              value={this.state.searchInput} onChange={(event) => this.setState({searchInput: event.target.value})} className="searchIn"
            />
            </Grid>
          </div>
        </Toolbar>
        </Grid>
      </AppBar>
    );
  }
}

//       <div className={classes.root}>
//   <AppBar position="static">
//     <Toolbar>
//       <IconButton
//         edge="start"
//         className={classes.menuButton}
//         color="inherit"
//         aria-label="open drawer"
//       >
//         <MenuIcon />
//       </IconButton>
//       <Typography className={classes.title} variant="h6" noWrap>
//         Giphylicious
//       </Typography>
//       <div className={classes.search}>
//         <div className={classes.searchIcon}>
//           <SearchIcon />
//         </div>
//         <InputBase
//           value={this.state.searchInput}
//           placeholder="Search…"
//           onChange={(event) => this.setState({searchInput: event.target.value})} className="searchIn"
//           classes={{
//             root: classes.inputRoot,
//             input: classes.inputInput,
//           }}
//           inputProps={{ 'aria-label': 'search' }}
//         />
//       </div>
//     </Toolbar>
//   </AppBar>
// </div>

export default withRouter(connect()(NavBar));
