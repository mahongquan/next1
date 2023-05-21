import React, { Component } from 'react';
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
      </div>
    );
  };
}
