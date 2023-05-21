import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import Home from './Home_new';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
let ipcRenderer;
if (window.require) {
  ipcRenderer = require('electron').ipcRenderer; //
}
const history = createHashHistory({
  hashType: 'slash', // the default
});
export default class Root extends Componentchat {
  constructor() {
    super();
    if (ipcRenderer) {
      ipcRenderer.on('goback', () => {
        console.log(history);
        history.goBack();
      });
    }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="routers" component={AppRoutes} />
          <Route exact path="" component={Home} />
        </Switch>
      </Router>
    );
  }
}
