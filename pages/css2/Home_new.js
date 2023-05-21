import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const fs = window.require('fs');
const path = window.require('path');
// console.log(path);
function fileExist(p) {
  if (fs.existsSync(p)) {
    return true;
  }
  return false;
}
function link(where, module_name) {
  // body...
  var thelink = document.createElement('link');
  thelink.setAttribute('rel', 'stylesheet');
  var file1 = path.join(where, module_name);
  thelink.setAttribute('href', file1);
  document.head.appendChild(thelink);
}
function getWhere() {
  let path = window.require('electron').ipcRenderer.sendSync('getpath');
  return path;
}
let where = getWhere();
export default class Root extends Component {
  click_router = () => {
    console.log('click_router');
    let module_name = './AppRoutes';
    let App = require(module_name).default;
    link(where, 'node_modules/highlight.js/styles/dark.css');
    ReactDOM.render(<App />, document.getElementById('app'));
  };
  click_split = () => {
    let module_name = './AppRoutesSplit';
    let App = require(module_name).default;
    link(where, 'node_modules/highlight.js/styles/dark.css');
    ReactDOM.render(<App />, document.getElementById('app'));
  };
  render() {
    return (
      <div>
        <div style={{ display: 'fixed' }}>
          <button onClick={this.click_router}>routers</button>
          <button onClick={this.click_split}>split</button>
          <button
            onClick={() => {
              let module_name = './FlexHelp';
              let App = require(module_name).default;
              ReactDOM.render(<App />, document.getElementById('app'));
            }}
          >
            FlexHelp
          </button>
          <button
            onClick={() => {
              let module_name = './MotionDemo';
              let App = require(module_name).default;
              ReactDOM.render(<App />, document.getElementById('app'));
            }}
          >
            react MotionDemo
          </button>
          <button
            onClick={() => {
              let module_name = './ReactLiveEdit';
              let App = require(module_name).default;
              ReactDOM.render(<App />, document.getElementById('app'));
            }}
          >
            react live
          </button>
          <button
            onClick={() => {
              let module_name = './AppRoutesLayout';
              let App = require(module_name).default;
              link(where, 'node_modules/highlight.js/styles/dark.css');
              ReactDOM.render(<App />, document.getElementById('app'));
            }}
          >
            layout
          </button>
          <button
            onClick={() => {
              let module_name = './Tabs';
              let App = require(module_name).default;
              link(where, 'node_modules/react-tabs/style/react-tabs.css');
              link(
                where,
                'node_modules/storm-react-diagrams/dist/style.min.css'
              );
              link(where, 'node_modules/react-virtualized/styles.css');

              link('./', 'semantic-ui/semantic.css');
              link('./', 'react-resizable.css');
              ReactDOM.render(<App />, document.getElementById('app'));
            }}
          >
            tabs
          </button>
        </div>
        <div id="app" />
      </div>
    );
  }
}
