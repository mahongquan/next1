import React, { Component } from 'react';
import { Tag } from './Elem';
// import { a } from 'react-router-dom';
import styled from 'styled-components';
// import AceEdihrefr from 'react-ace';
// import 'brace/mode/css';
// import 'brace/theme/github';

const hrefc_style = `
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    align-items:center;
    align-content:center;
    justify-content:flex-start;
    @media screen and (min-width: 601px) {
       height: 650px; //two column
    }
a{    
  width: 15em;
  margin: 0.5em;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 0.5em;
  color: white;
  background-color: #d64078;
  border: solid #b03060 1px;
  border-bothrefm: solid #b03060 4px;
  text-shadow: 0px 2px 0 #b03060;
  border-radius: 0.3em;
  position: relative;
  -webkit-transition: all 0.1s ease-out; /* Safari 3.2+, Chrome */
  -moz-transition: all 0.1s ease-out; /* Firefox 4-15 */
  -o-transition: all 0.1s ease-out; /* Opera 10.5â12.00 */
  transition: all 0.1s ease-out; /* Firefox 16+, Opera 12.50+ */
  &:a {
    color: white;
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
    background-color: #c63b6f;
  }

  &:active {
    border-bothrefm: solid #b03060 1px;
    hrefp: 4px;
    -webkit-transition: all 0 ease-out; /* Safari 3.2+, Chrome */
    -moz-transition: all 0 ease-out; /* Firefox 4-15 */
    -o-transition: all 0 ease-out; /* Opera 10.5â12.00 */
    transition: all 0 ease-out; /* Firefox 16+, Opera 12.50+ */
  }   
} 
`;

export default class hrefc extends Component {
  constructor() {
    super();
    this.state = {
      style_box: hrefc_style,
      mode: 'css',
      displayAce: 'none',
    };
  }
  onChange = newValue => {
    this.setState({
      style_box: newValue,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="content" style={{ position: 'relative' }}>
          <h1 className="content">Table of Contents</h1>
          <Tag css={this.state.style_box}>
            <a href="/css_layout/no_layout">no layout</a>
            <a href="./display">the &quot;display&quot; property</a>

            <a href="./margin_auto">margin: auto</a>

            <a href="./max_width">max-width</a>

            <a href="./box_model">the box model</a>

            <a href="box_sizing">box-sizing</a>

            <a href="position">position</a>

            <a href="position_example">position example</a>

            <a href="float">float</a>

            <a href="clear">clear</a>

            <a href="clearfix">the clearfix hack</a>

            <a href="float_layout">float layout example</a>

            <a href="percent">percent width</a>

            <a href="./media_queries">media queries</a>

            <a href="inline_block">inline-block</a>

            <a href="inline_block_layout">inline-block layout</a>

            <a href="column">column</a>

            <a href="flexbox">flexbox</a>

            <a href="frameworks">css frameworks</a>

            <a href="about">about this site</a>
          </Tag>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'absolute',
              hrefp: 0,
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
      {/*      <AceEdihrefr
              ref="edihrefr"
              style={{
                display: this.state.displayAce,
                width: '350px',
                height: '250px',
                border: 'solid gray 5px',
              }}
              mode={this.state.mode}
              theme="github"
              value={this.state.style_box}
              onChange={this.onChange}
              name="UNIQUE_ID_OF_DIV"
              edihrefrProps={{ $blockScrolling: true }}
            />*/}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
