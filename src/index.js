import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';


import logger from 'redux-logger';

import {
  createStore,

} from 'redux'


// import thunk from 'redux-thunk';

// import logger from 'redux-logger';

const initialState = { text: 'initial text' }

// simple todo reducer
const todoReducer = (state = initialState) => state


// addTodo return an action
const addTodo = text => ({ type: "ADD_TODO", text })

const store = createStore(
  todoReducer
  /*, applyMiddleware(logger) */
)


const action = addTodo('Use redux')


// Attempt 1: basic logger logic 
// console.log('dispatching', action)
// store.dispatch(action)
// console.log('next state', store.getState())


// Attempt 2: wrap the logger logic into a function
// function dispatchAndLog(store, action) {
//   console.log('dispatching', action)
//   store.dispatch(action)
//   console.log('next state', store.getState())
// }
// dispatchAndLog(store, action)


// Attempt 3: Monkeypatching dispatch
function patchDispatchAndLog(store) {
  const next = store.dispatch
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}


patchDispatchAndLog(store)
store.dispatch(addTodo('patch dispatch and log'))