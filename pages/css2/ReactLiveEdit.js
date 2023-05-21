import React, { Component } from 'react';
import Elem, { Tag, NavWrapper, LinkPrev, LinkStyle, A } from './Elem';
import styled from 'styled-components';
import Ace from './Ace';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
const css = `
#main{
  margin:auto;
  background-color:#eee;
  justify-content: space-between;
  flex-wrap:wrap;
  align-items: stretch;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  width:100vw;
  height:100vh;
}
#header{
  height:50px;
  margin:1px;
  background-color:#bbb;
}
#footer{
  height:50px;
  margin:1px;
  background-color:#ccc;
}
#content{
  background-color:#aaa;
  justify-content: space-around;
  flex-wrap:wrap;
  align-items: stretch;
  display:flex;
  flex-direction:row;
  overflow:hidden;
  flex:1;
}
#sidebar{
  background-color:#999;
  width:200px;
}
#mainbody{
  background-color:#888;
  margin:0 0 0 0;
  flex:1;
}
`;
const jsx = `<div id="main" >
 <div id="header">
   toolbar
 </div>
 <div id="content" >
   <div id="sidebar">sitebar</div>      
   <div id="mainbody">body</div>
 </div>
 <div id="footer" >footer</div>
</div>
`;

export default class Root extends Componentchat {
  constructor() {
    super();
    this.state = {
      jsx: jsx,
      css: css,
      displayLE: 'none',
    };
  }
  cssChange = newValue => {
    this.setState({
      css: newValue,
    });
  };
  render() {
    // console.log(this.props);
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Ace css={this.state.css} cssChange={this.cssChange} />
        <LiveProvider code={this.state.jsx}>
          <Tag css={this.state.css}>
            <LivePreview />
          </Tag>
          <LiveError />
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <button
              onClick={() => {
                if (this.state.displayLE == 'none') {
                  this.setState({ displayLE: 'block' });
                } else {
                  this.setState({ displayLE: 'none' });
                }
              }}
            >
              edit jsx
            </button>
            <LiveEditor
              style={{
                display: this.state.displayLE,
                overflow: 'auto',
                width: '300px',
                height: '300px',
              }}
            />
          </div>
        </LiveProvider>
        <style jsx="true">
          {`
            * {
              box-sizing: border-box;
            }
            html {
              font-size: 1rem;
              overflow-wrap: break-word;
            }
            body {
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </div>
    );
  }
}
