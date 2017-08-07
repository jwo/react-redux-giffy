import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'

const userReducer = (state={}, action) => {
  if (action.type === 'AUTH'){
    return {
      username: action.username,
      token: action.token
    }
  }
  return state
}

const gifsReducer = (state=[], action) => {
  if (action.type === 'GIFS_RECEIVED'){
    return action.gifs
  }
  if (action.type === 'NEW_GIF') {
    const gifs = []
    gifs[0] = action.gif
    for (var i = 0; i < state.length; i++) {
      gifs.push(state[i])
    }
    return gifs;
  }
  return state
}

const loadingReducer = (state=false, action) => {
  if (action.type === 'START_LOADING'){
    return true;
  }
  if (action.type === 'STOP_LOADING') {
    return false;
  }
  return state
}

const reducer = combineReducers({
  user: userReducer,
  gifs: gifsReducer,
  loading: loadingReducer
})

// const store = createStore(reducer)

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe( () => console.log("STATE", store.getState()))
store.dispatch({type: "@@INIT@@"})

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
