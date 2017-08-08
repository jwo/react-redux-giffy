import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Register';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import thunk from 'redux-thunk'

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

/// How to get DevTools AND thunk working
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)


store.subscribe( () => console.log("STATE", store.getState()))
store.dispatch({type: "@@INIT@@"})

ReactDOM.render(<Provider store={store}>

  <div className="App">
    <div className="App-header">
      <h2>Welcome to Giffy</h2>
    </div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/register" component={Register}/>
      </Switch>
    </BrowserRouter>
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();
