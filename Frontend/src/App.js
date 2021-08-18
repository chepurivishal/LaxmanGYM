import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import React from "react";
import Login from './Components/Login';
import Home from './Components/Home';

const history = createBrowserHistory();

function App() {
  return (
    <body>
      <HashRouter history = {history}>
        <Switch>
          <Route path='/home' render = {() => <Home/>}/>
          <Route path='/login' render = {() => <Login/>}/>
          <Route path='/' render = {() => <Login/>} />
        </Switch>
      </HashRouter>
    </body>
  );
}

export default App;
