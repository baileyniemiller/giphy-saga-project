import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import logger from "redux-logger";

//saga for getting GIfs from giphy
function* fetchGiphyGifs(action) {
  //wrap it in a try/catch
  //yield axios
  // api key: eRkQ774YosOSGmThbU2GmO421oAsXmyV
  try {
    const response = yield axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=su7x5YLWWje688tDfOceZmehnGWnCWcJ&q=${action.payload}&limit=25&offset=0&rating=G&lang=en`
    );
    console.log(response.data.data);
    const gifList = response.data.data.map((cur, i) => {
      return {
        url: cur.images.fixed_height.url,
        title: cur.title,
      };
    });
    console.log(gifList);
    yield put({ type: "SET_GIPHY_GIFS", payload: gifList });
  } catch (error) {
    console.log(error);
    alert("Unable to get Gifs from Giphy");
  }
}

function* fetchCategories(action) {
  try {
    const response = yield axios.get("/api/category");
    yield put({ type: "SET_CATEGORIES", payload: response.data });
  } catch (error) {
    console.log("Error getting categories", error);
  }
}

// GET on /favorite
function* fetchFavGifs(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
		const response = yield axios.get("/api/favorite");
		const moddedRes = response.data.map((cur, i) => {
			cur.isFavorited = true;
			return cur
		})
    yield put({ type: "SET_FAV_GIFS", payload: moddedRes });
  } catch (error) {
    console.log("Error getting favorites ", error);
  }
} // end GET

function* addCategoryIdToFavs(action) {
  try {
    //incoming action.payload looks like: {categoryID: categoryID, gifId: gifId}
    yield axios.put(
      `/api/favorite/${action.payload.gifId}`,
      {category: action.payload.categoryID}
		);
		yield put({type: "FETCH_FAV_GIFS"})
    console.log("Success sending category id to the server");
  } catch (error) {
    console.log("Error putting category ID into favorites", error);
  }
}

function* addFavorite(action) {
  //  this is what the post is expecting server side {image_name: 'Cat', url}

  try {
    let post = { image_name: action.payload.title, url: action.payload.url };
    yield axios.post(`/api/favorite`, post);
    console.log("Success sending favorite to DB");
    yield put({ type: "FETCH_FAV_GIFS" }); //refresh fav gif list
  } catch (error) {
    console.log("Error posting favorite");
  }
}

//function* deleteFavorite (action){
//      try{
//          yield axios.delete(`/api/favrite/${action.payload.id}`);
//          yield put({ type: "FETCH_FAV_GIFS" }); //refresh fav gif list
//   } catch (error) {
//     console.log("Error posting favorite");
//   }
//      
//  }




// sagas
// rootsaga
// giphySaga
// - FETCH_GIPHY_GIFS (search string payload)
//	- query giphy
//  - dispatch SET_GIPHY_GIFS (response)

// favSaga
// - FETCH_FAV_GIFS (search string payload)
//	- query database
//  - dispatch SET_FAV_GIFS (response)
function* rootSaga() {
  yield takeEvery("FETCH_GIPHY_GIFS", fetchGiphyGifs);
  yield takeEvery("FETCH_FAV_GIFS", fetchFavGifs);
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("CAT_ID_TO_FAVS", addCategoryIdToFavs);
  yield takeEvery("ADD_FAVORITE", addFavorite);
}

// redux store
// giphyReducer (contain all results from search
// - SET_GIPHY_GIFS (sets gifs)[action.payload]
// favoritesReducer (contains all favorites)
// - SET_FAV_GIFS

// giphyReducer
const giphyReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_GIPHY_GIFS":
      return [...action.payload];
    default:
      return state;
  }
};

// favoritesReducer
const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FAV_GIFS":
      return [...action.payload];
    default:
      return state;
  }
};

//categoriesReducer
const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return [...action.payload];
    default:
      return state;
  }
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    giphyReducer,
    favoritesReducer,
    categoriesReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("react-root")
);
