import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
} from 'redux'


import thunk from 'redux-thunk';

import logger from 'redux-logger';

// ReactDOM.render(
//   <React.StrictMode>

//       <App />

//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const makeLouder = string => string.toUpperCase();
// const repeatThreeTimes = string => string.repeat(3);
// const embolden = string => string.bold();

// const composeFunctions = compose(embolden, repeatThreeTimes, makeLouder);
// console.log(composeFunctions('hello'));

const initialState = { value: 0 };

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "counter/increment": 
      newState = {
        ...state,
        value: state.value + 1 
      }
      return newState
    case "counter/add":
      newState = {
        ...state,
        value: state.value + action.value
      }
      return newState
    default:
      return state
    }
} 

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk)
);
// console.log(store);

const increase = () => ({ type: "counter/increment" })
const add = (value) => ( { type : "counter/add",  value })


/**  method 1: use bindActionCreators  */

const actions = bindActionCreators( { increase, add }, store.dispatch)
// console.log('actions:' , actions);
// actions.add(100)
// actions.increase()

/** method 2: use Array.prototype.map and compose */
const [dispatchIncreaseAction, dispatchAddAction] = [increase, add].map(fn => compose(store.dispatch, fn))

dispatchIncreaseAction()
dispatchAddAction(101)


console.log(store.getState())
// store.dispatch(actions)
// store.dispatch(increase())

// store.dispatch(add())


// store.getState() return the state object, 
// using 'redux-logger' middleware is better 
// console.log(store.getState());