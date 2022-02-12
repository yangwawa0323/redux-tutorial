import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from 'redux'


import thunk from 'redux-thunk';

import logger from 'redux-logger';

const initialState = {
  users: [
    { id: 1, name: 'yangwawa' },
    { id: 2, name: 'Eric' }
  ],
  tasks: [
    { title: 'File the TPS reports' },
    { title: 'Order more energy drink' }
  ]
};

const ADD_TASK = 'ADD_TASK';
const ADD_USER = 'ADD_USER';

// pass the title object { title }
const addTask = (title) => ({ type: ADD_TASK, payload:  title  });
const addUser = (name) => ({ type: ADD_USER, payload:  name  });

const userReducer = (users = initialState.users, action) => {
  if (action.type === ADD_USER) {
    return [...users, action.payload ]
  }
  return users
}

const taskReducer = (tasks = initialState.tasks, action) => {
  if (action.type === ADD_TASK) {
    return [...tasks, action.payload]
  }
  return tasks
}

const reducer = combineReducers({ users: userReducer, tasks: taskReducer })
  
const store = createStore(reducer,
applyMiddleware(logger))

store.dispatch(addTask({ title: 'ride bicycle' }))
store.dispatch(addUser({ id : 3 , name: 'yangkun'}))