
import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
  isFetching: false,
};

export const userContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isFetching: true };
    case 'LOGIN_SUCCESS':
      return { ...state, isFetching: false, user: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, isFetching: false, user: null }; 
    
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

