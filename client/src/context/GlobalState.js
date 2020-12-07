import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  somethingElse: 'for testing only',
  cocktails: [],
  device: '',
  server: '',
  service: '',
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setIsAuthenticated(auth) {
    dispatch({
      type: 'SET_AUTHENTICATION',
      payload: auth,
    });
  }
  function setCocktails(cocktails) {
    dispatch({
      type: 'SET_COCKTAILS',
      payload: cocktails,
    });
  }
  function deleteCocktail(id) {
    dispatch({
      type: 'DELETE_COCKTAIL',
      payload: id,
    });
  }
  function addCocktail(cocktail) {
    dispatch({
      type: 'ADD_COCKTAIL',
      payload: cocktail,
    });
  }
  function editCocktail(cocktail) {
    dispatch({
      type: 'EDIT_COCKTAIL',
      payload: cocktail,
    });
  }
  function setBluetoothDevice(device) {
    dispatch({
      type: 'SET_BLUETOOTH_DEVICE',
      payload: device,
    });
  }
  function setBluetoothServer(server) {
    dispatch({
      type: 'SET_BLUETOOTH_SERVER',
      payload: server,
    });
  }
  function setBluetoothService(service) {
    dispatch({
      type: 'SET_BLUETOOTH_SERVICE',
      payload: service,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        setIsAuthenticated,
        somethingElse: state.somethingElse,
        cocktails: state.cocktails,
        setCocktails,
        deleteCocktail,
        addCocktail,
        editCocktail,
        device: state.device,
        server: state.server,
        service: state.service,
        setBluetoothDevice,
        setBluetoothServer,
        setBluetoothService,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
