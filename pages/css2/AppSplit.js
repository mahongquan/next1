import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Triangle from './Triangle';
// import {  Link } from 'react-router-dom';
import Elem, { Tag, NavWrapper, LinkPrev2, LinkStyle, A } from './Elem';
import styled from '@emotion/styled'
import Ace from './Ace';
import Toc from './toc2';
import SplitPane from 'react-split-pane';

const logo_style = `
text-align: center;
background-color: #ededed;
padding: 1em 0;

>a {
  text-decoration: none;
  color: #414142;
  position: relative;
  &:active {
    background: none;
  }
  >span {
      vertical-align: middle;
      font-size: 2em;
      font-family: 'Bree Serif', serif;
      margin-left: 0.2em;
      @media screen and (max-width: 404px) {
        font-size: 1.5em;
      }
  }
  >img {
      vertical-align: middle;
      
      @media screen and (max-width: 600px) {
            width: 15%;
      }
  }
}
`;

class Root extends Component{
  constructor() {
    super();
    this.state = {
      logo_style: logo_style,
    };
  }

  onChange_logo = newValue => {
    this.setState({
      logo_style: newValue,
    });
  };
  getPrevNext = () => {
    let prev, next
    let at=this.props.at;
        prev = at - 1;
        next = at + 1;
        if (prev >= 0) {
          prev = true;
        } else {
          prev = undefined;
        }
        if (next < this.props.length) {
          next = true;
        } else {
          next = undefined;
        }
    return [prev, next, at];
  };
  render() {
    console.log(this.props);
    let visible_home, visible_toc;
    // if (this.props.at>= 0) {
    //   visible_home = 'hidden';
    // } else {
    //   visible_home = 'visible';
    // }
    if (this.props.at >= 0) {
      visible_toc = 'hidden';
    } else {
      visible_toc = 'visible';
    }
    var arr1 = this.getPrevNext();
    console.log(arr1);
    let prev = arr1[0];
    let next = arr1[1];
    let i = arr1[2] + 1;
    if (prev) {
      prev = <LinkPrev2 onClick={this.props.click_prev}>Previous</LinkPrev2>;
    }
    if (next) {
      next = <LinkPrev2 onClick={this.props.click_next}>Next</LinkPrev2>;
    }
    let nav;
    if (prev || next) {
      nav = (
        <React.Fragment>
          <NavWrapper>
            {prev}
            {next}
          </NavWrapper>
          <footer>{i} / 22</footer>
        </React.Fragment>
      );
    }
    return (
      <div>
        <style jsx="true">{`
          html {
            font-size: 1rem;
            overflow-wrap: break-word;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-variant-ligatures: none;
            font-variant-ligatures: none;
          }
          body {
            margin: 0;
            padding: 0 0 1em 0;
            font-size: 1em;
            line-height: 1.5em;
            color: #414142;
            font-family: Arial;
            background-color: #ededed;
          }

          * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          a:link {
            color: #d64078;
            text-decoration: none;
          }

          a:visited {
            color: #d64078;
          }

          a:hover {
            text-decoration: underline;
          }

          a:active {
            background-color: black;
            color: white;
          }
          img {
            max-width: 100%;
          }

          p {
            margin: 1em 0;
          }

          p code,
          li code {
            background-color: #ececec;
          }

          h1,
          h2 {
            font-family: 'Bree Serif', serif;
            font-weight: normal;
          }

          h1 {
            margin: 1.5em 0;
            font-weight: normal;
            text-align: center;
          }

          h2 {
            font-family: 'Bree Serif', serif;
            margin: 1.2em 0;
            font-weight: normal;
          }
          #container {
            padding: 1em;
            margin: 0 0 1em 0;
            background-color: white;
          }

          .content {
            max-width: 600px;
            margin: 1em auto;
          }

          h1.content {
            margin: 0.5em auto 1em;
          }

          .ipsum {
            color: #734161;
            background-color: #eee;
          }

          .highlight {
            margin: 2em auto;
            max-width: 600px;
            line-height: 1.2em;
            font-size: 16px;
            direction: ltr;
          }
          footer {
            text-align: center;
          }
        `}</style>
        <Tag css={this.state.logo_style} id="logo">
          <A href="/">
            <img src="./images/logo.png" alt="logo" />
            <span>Learn CSS Layout</span>
          </A>
        </Tag>
        <div id="container">{this.props.children}</div>
        {nav}
        <div style={{ minHeight: '100px' }} />
        <Ace css={this.state.logo_style} cssChange={this.onChange_logo} />
      </div>
    );
  }
}
class QueryBrowserContainer extends Component {
  state = {};
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {}
  windowclick = e => {};
  render() {
    return (
      <div>
        <SplitPane
          split="vertical"
          minSize={150}
          pane2Style={{ overflow: 'auto' }}
        >
          <Toc />
          <Root at={this.props.at} length={this.props.length} click_next={this.props.click_next} 
            click_prev={this.props.click_prev}
           history={this.props.history}>{this.props.children}</Root>
        </SplitPane>
        <style jsx="true">{`
          .Resizer {
            background: #000;
            opacity: 0.2;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
          }

          .Resizer:hover {
            -webkit-transition: all 2s ease;
            transition: all 2s ease;
          }

          .Resizer.horizontal {
            height: 11px;
            margin: -5px 0;
            border-top: 5px solid rgba(255, 255, 255, 0);
            border-bottom: 5px solid rgba(255, 255, 255, 0);
            cursor: row-resize;
            width: 100%;
          }

          .Resizer.horizontal:hover {
            border-top: 5px solid rgba(0, 0, 0, 0.5);
            border-bottom: 5px solid rgba(0, 0, 0, 0.5);
          }

          .Resizer.vertical {
            width: 11px;
            margin: 0 -5px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
          }

          .Resizer.vertical:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.5);
            border-right: 5px solid rgba(0, 0, 0, 0.5);
          }
          .Resizer.disabled {
            cursor: not-allowed;
          }
          .Resizer.disabled:hover {
            border-color: transparent;
          }
        `}</style>
      </div>
    );
  }
}

export default QueryBrowserContainer;
