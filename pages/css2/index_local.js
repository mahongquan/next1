<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
const fs = require('fs');
const path = require('path');
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
console.log(where);
let module_name = './Home_new';
// let module_name="./AppRoutes";
// let module_name="./Tabs";
// module_name="./FlexHelp";
// let module_name="./AppRoutesLayout";
// module_name="./AppRoutes";
// let module_name="./ReactLiveEdit";
// let module_name="./AppRoutesSplit";
// let module_name="./MotionDemo";
// let module_name="./MotionDemo2";
// if(module_name==="./AppRoutesSplit"
// 	|| module_name==="./AppRoutes"
// 	|| module_name==="./AppRoutesLayout")
// {
//    link(where,"node_modules/highlight.js/styles/dark.css");
// }
// else if (module_name==="./Tabs"){
//     link(where,"node_modules/react-tabs/style/react-tabs.css");
//     link(where,"node_modules/storm-react-diagrams/dist/style.min.css");
//     link(where,"node_modules/react-virtualized/styles.css");

//     link("./","semantic-ui/semantic.css");
//     link("./","react-resizable.css");
// }

let App = require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));
=======
import React from 'react';
import ReactDOM from 'react-dom';
const fs = require('fs');
const path = require('path');
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
console.log(where);
// let module_name = './Home_new';
let module_name="./AppRoutes";
// let module_name="./Tabs";
// module_name="./FlexHelp";
// let module_name="./AppRoutesLayout";
// module_name="./AppRoutes";
// let module_name="./ReactLiveEdit";
// let module_name="./AppRoutesSplit";
// let module_name="./MotionDemo";
// let module_name="./MotionDemo2";
// if(module_name==="./AppRoutesSplit"
// 	|| module_name==="./AppRoutes"
// 	|| module_name==="./AppRoutesLayout")
// {
//    link(where,"node_modules/highlight.js/styles/dark.css");
// }
// else if (module_name==="./Tabs"){
//     link(where,"node_modules/react-tabs/style/react-tabs.css");
//     link(where,"node_modules/storm-react-diagrams/dist/style.min.css");
//     link(where,"node_modules/react-virtualized/styles.css");

//     link("./","semantic-ui/semantic.css");
//     link("./","react-resizable.css");
// }

let App = require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> d207ed8bea4d7366c84542f53fbf7ae97d93f66b
