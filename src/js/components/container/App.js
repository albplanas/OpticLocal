import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./Home"

import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';

import globalStateReducer from '../../../store/reducers/globalState';
import objectReducer from '../../../store/reducers/Objects';
import profileReducer from '../../../store/reducers/profile';
import workpaperReducer from '../../../store/reducers/WorkPaper';

const rootReducers = combineReducers({
  globalState  : globalStateReducer,
  object       : objectReducer,
  profile      : profileReducer,
  workpaper    : workpaperReducer
}) 

const store = createStore(rootReducers);



class App extends Component {

  render() {
    return (
      <Home/>
    );
  }
}

export default App;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Provider store={store}><App /></Provider>, wrapper) : false;