import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

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

// redux store
// giphyReducer (contain all results from search
// - SET_GIPHY_GIFS (sets gifs)[action.payload]
// favoritesReducer (contains all favorites)
// - SET_FAV_GIFS

ReactDOM.render(<App />, document.getElementById('react-root'));
