## Components

1. NavBar own component (need withRouter in export)
	- Title
	- Search route /search
		- react-router route
	- Favorites route /favorites
    - react-router route
  - Search button - material-ui icon :)
    - icon button component
    - onSubmit of form --> dispatch (enter & search works)
      - dispatch: FETCH_GIFS, payload: this.state.searchInput
  - Search bar --> text field component
    - Will have local state


2. Search Component 
    - Bring in redux store (to display searched from giphy)
    - Scroll between search results (display few of response)
    - use GridList component to display query results


3.  GridList component -displayed all the time
	- gallery store - contains current images - can come from giphy query or from favs
	- collection of Gif components
	
4. Gif component
	- displays image
	- has titlebar component displayed on hover

5. TitleBar component
	  - TitleBar component (pops up on hover)
		- conditional rendering based on history (needs withRouter)
		- if in search route, then show only fav icon (outline) (turns to filled on click)
		- if in favorites route, then show category and fav icon (filled) (alt text "unlike"), 