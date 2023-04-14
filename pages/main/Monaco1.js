import React, { Component } from 'react';
import Editor from "@monaco-editor/react";

// export default function App() {
//   return (
//    <Editor
//      height="90vh"
//      defaultLanguage="javascript"
//      defaultValue="// some comment"
//    />
//   );
// }
export default class Root extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'css',
      displayAce: 'none',
    };
  }
  render = () => {
    var d = new Date();
    console.log(this.state);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <button
          onClick={() => {
            if (this.state.displayAce == 'none') {
              this.setState({ displayAce: 'block' });
            } else {
              this.setState({ displayAce: 'none' });
            }
          }}
        >
          edit style
        </button>
        {
        /*<Editor
          style={{
            display: this.state.displayAce,
            width: '300px',
            height: '300px',
            border: 'solid gray 5px',
          }}
           height="300px"
           defaultLanguage={this.state.mode}
           defaultValue={this.props.mycss}
           onChange={this.props.cssChange} 
        />*/
      }
    <Editor
          style={{
            display: this.state.displayAce,
            width: '300px',
            height: '300px',
            border: 'solid gray 5px',
          }}

      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
      </div>
    );
  };
}
