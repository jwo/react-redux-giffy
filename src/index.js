import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

const userReducer = (state={}, action) => {
  return state
}

const gifsReducer = (state=[], action) => {
  return state
}

const loadingReducer = (state=false, action) => {
  return state
}

const reducer = combineReducers({
  user: userReducer,
  gifs: gifsReducer,
  loading: loadingReducer
})

const store = createStore(reducer)
store.subscribe( () => console.log("STATE", store.getState()))
store.dispatch({type: "@@INIT@@"})

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
