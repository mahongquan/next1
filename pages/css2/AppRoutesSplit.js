import React, { Component } from 'react';
import App from './AppSplit';
import about from './about';
import box_model from './box_model';
import box_sizing from './box_sizing';
import clear from './clear';
import clearfix from './clearfix';
import column from './column';
import display from './display';
import flexbox from './flexbox';
import float_layout from './float_layout';
import float from './float';
import frameworks from './frameworks';
import index from './home';
import inline_block_layout from './inline_block_layout';
import inline_block from './inline_block';
import margin_auto from './margin_auto';
import max_width from './max_width';
import media_queries from './media_queries';
import no_layout from './no_layout';
import percent from './percent';
import position_example from './position_example';
import position from './position';
import toc from './toc';
import styled from '@emotion/styled'
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
    const theme = { red: '#D64078', green: '#96C02E', orange: '#FDC72F' };
    return (
      <Router history={history}>
          <App>
            <Switch>
              <Route exact path="/about.html" component={about} />
              <Route exact path="/box-model.html" component={box_model} />
              <Route exact path="/box-sizing.html" component={box_sizing} />
              <Route exact path="/clear.html" component={clear} />
              <Route exact path="/clearfix.html" component={clearfix} />
              <Route exact path="/column.html" component={column} />
              <Route exact path="/display.html" component={display} />
              <Route exact path="/flexbox.html" component={flexbox} />
              <Route exact path="/float-layout.html" component={float_layout} />
              <Route exact path="/float.html" component={float} />
              <Route exact path="/frameworks.html" component={frameworks} />
              <Route exact path="/index.html" component={index} />
              <Route
                exact
                path="/inline-block-layout.html"
                component={inline_block_layout}
              />
              <Route exact path="/inline-block.html" component={inline_block} />
              <Route exact path="/margin-auto.html" component={margin_auto} />
              <Route exact path="/max-width.html" component={max_width} />
              <Route
                exact
                path="/media-queries.html"
                component={media_queries}
              />
              <Route exact path="/no-layout.html" component={no_layout} />
              <Route exact path="/percent.html" component={percent} />
              <Route
                exact
                path="/position-example.html"
                component={position_example}
              />
              <Route exact path="/position.html" component={position} />
              <Route exact path="/toc.html" component={toc} />
              <Route component={index} />
            </Switch>
          </App>
      </Router>
    );
  }
}
