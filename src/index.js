import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import logger from "redux-logger";

//saga for getting GIfs from giphy
function* fetchGiphyGifs (action) {
    //wrap it in a try/catch
		//yield axios
		// api key: eRkQ774YosOSGmThbU2GmO421oAsXmyV
    try{
        const response = yield axios.get(`https://api.giphy.com/v1/gifs/search?api_key=su7x5YLWWje688tDfOceZmehnGWnCWcJ&q=${action.payload}&limit=25&offset=0&rating=G&lang=en`);
				console.log(response.data.data);
				const gifList = response.data.data.map((cur, i) => {
					return {
						url: cur.images.fixed_height.url,
						title: cur.title,
					}
				})
				console.log(gifList);
				yield put({type: "SET_GIPHY_GIFS", payload: gifList})
    }catch(error){
			console.log(error);
        alert('Unable to get Gifs from Giphy')
    }

}

// GET on /favorite
function* fetchFavGifs(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
    const response = yield axios.get("/favorite");
    yield put({ type: "SET_FAV_GIFS", payload: response.data });
  } catch (error) {
    console.log('Error getting favorites ', error);
  }
}// end GET

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
function* rootSaga()   {
    yield takeEvery('FETCH_GIPHY_GIFS', fetchGiphyGifs);
    yield takeEvery('FETCH_FAV_GIFS', fetchFavGifs);
} 

// redux store
// giphyReducer (contain all results from search
// - SET_GIPHY_GIFS (sets gifs)[action.payload]
// favoritesReducer (contains all favorites)
// - SET_FAV_GIFS

// giphyReducer
const giphyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GIPHY_GIFS':
      return [...action.payload]
    default:
      return state;
  }
};

// favoritesReducer
const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAV_GIFS':
      return [...action.payload ]
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
        favoritesReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('react-root'));
