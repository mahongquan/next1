import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Triangle from './Triangle';
import { withRouter, Link } from 'react-router-dom';
import Elem, { Tag, NavWrapper, LinkPrev, LinkStyle, A } from './Elem';
import styled from '@emotion/styled'
import Ace from './Ace';
import Toc from './toc2';
import Home from "./Home"
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
const pages = [
  'index.html',
  'no-layout.html',
  'display.html',
  'margin-auto.html',
  'max-width.html',
  'box-model.html',
  'box-sizing.html',
  'position.html',
  'position-example.html',
  'float.html',
  'clear.html',
  'clearfix.html',
  'float-layout.html',
  'percent.html',
  'media-queries.html',
  'inline-block.html',
  'inline-block-layout.html',
  'column.html',
  'flexbox.html',
  'frameworks.html',
  'about.html',
];
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
    let prev, next, at;
    // for (var i = 0; i < pages.length; i++) {
    //   if (this.props.history.location.pathname.indexOf(pages[i]) >= 0) {
    //     prev = i - 1;
    //     next = i + 1;
    //     if (prev >= 0) {
    //       prev = pages[prev];
    //     } else {
    //       prev = undefined;
    //     }
    //     if (next < pages.length) {
    //       next = pages[next];
    //     } else {
    //       next = undefined;
    //     }
    //     at = i;
    //     break;
    //   }
    // }
    return [prev, next, at];
  };
  render() {
    // console.log(this.props);
    let visible_home, visible_toc;
    // if (this.props.history.location.pathname.indexOf('index.html') >= 0) {
    //   visible_home = 'hidden';
    // } else {
    //   visible_home = 'visible';
    // }
    // if (this.props.history.location.pathname.indexOf('toc.html') >= 0) {
    //   visible_toc = 'hidden';
    // } else {
    //   visible_toc = 'visible';
    // }
    var arr1 = this.getPrevNext();
    let prev = arr1[0];
    let next = arr1[1];
    let i = arr1[2] + 1;
    if (prev) {
      prev = <LinkPrev to={prev}>Previous</LinkPrev>;
    }
    if (next) {
      next = <LinkPrev to={next}>Next</LinkPrev>;
    }
    let nav;
    if (prev || next) {
      nav = (
        <React.Fragment>
          <NavWrapper>
            {prev}
            {next}
          </NavWrapper>
          <footer>{i} / 21</footer>
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
const SIDEBAR_WIDTH = 235;
const header_h = '0px';
const footer_h = '0px';
const STYLES = {
  wrapper: {
    position: 'relative',
  },
  footer: {
    position: 'fixed',
    top: `calc(100vh - ${footer_h})`,
    backgroundColor: '#666',
    overflow: 'hidden',
    width: '100%',
    height: `${footer_h}`,
  },
  collapse: {
    color: '#fff',
    cursor: 'pointer',
    width: 10,
    position: 'fixed',
    left: 0,
    top: `${header_h}`,
    height: `calc(100vh - ${footer_h} - ${header_h})`,
    backgroundColor: '#aaa',
  },

  header: {
    backgroundColor: '#666',
    position: 'fixed',
    left: 0,
    top: 0,
    height: `${header_h}`,
    width: '100%',
    margin: '0 0 0 0',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    padding: '0px 0px 0px 10px',
    margin: `${header_h} 0 0 0px`,
    overflow: 'auto',
  },
  sidebar: {
    transition: 'all .2s',
    backgroundColor: 'white',
    margin: '0 auto',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    paddingLeft: '0px',
    //backgroundColor:"#888"
  },
  resizeable: { width: 'auto', maxWidth: '100%' },
};
class LongSide extends Component {
  render() {
    var arr1 = [];
    for (var i = 0; i < 1000; i++) {
      arr1.push(i);
    }
    var ps = arr1.map((one, key) => {
      return <p key={key}>hello</p>;
    });
    return <div>begin{ps}end</div>;
  }
}
class Header extends Component {
  render() {
    var arr1 = [];
    for (var i = 0; i < 1000; i++) {
      arr1.push(i);
    }
    var ps = arr1.map((one, key) => {
      return <p key={key}>header</p>;
    });
    return <div style={{ display: 'flex' }}>{ps}</div>;
  }
}
class Footer extends Component {
  render() {
    var arr1 = [];
    for (var i = 0; i < 1000; i++) {
      arr1.push(i);
    }
    var ps = arr1.map((one, key) => {
      return <p key={key}>footer</p>;
    });
    return <div style={{ display: 'flex' }}>{ps}</div>;
  }
}
class LongSpan extends Component {
  render() {
    var arr1 = [];
    for (var i = 0; i < 1000; i++) {
      arr1.push(i);
    }
    var ps = arr1.map((one, key) => {
      return <span key={key}>{this.props.text}</span>;
    });
    return <span>{ps}</span>;
  }
}
class Long extends Component {
  render() {
    var arr1 = [];
    for (var i = 0; i < 1000; i++) {
      arr1.push(i);
    }
    var ps = arr1.map((one, key) => {
      return <p key={key}>hello</p>;
    });
    return <div>{ps}</div>;
  }
}

//Canvas width height change will result a new canvas.
//left top change will change ClientRect.

class QueryBrowserContainer extends Component {
  state = {
    sideBarWidth: SIDEBAR_WIDTH,
    sidebarCollapsed: false,
  };
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    window.addEventListener('click', this.windowclick);
  }
  windowclick = e => {
    console.log(e.target);
  };
  onCollapseClick = () => {
    this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
  };
  render() {
    return (
      <div style={STYLES.wrapper}>
        <div style={STYLES.container}>
          <div
            id="sidebar"
            style={{
              ...STYLES.sidebar,
              marginLeft: this.state.sidebarCollapsed
                ? -this.state.sideBarWidth
                : 0,
            }}
          >
            <ResizableBox
              className="react-resizable react-resizable-ew-resize"
              onResizeStop={(event, { size }) => {
                this.setState({ sideBarWidth: size.width });
              }}
              width={this.state.sideBarWidth || SIDEBAR_WIDTH}
              height={NaN}
              minConstraints={[50, 0]}
              maxConstraints={[window.innerWidth - 10 - 18, 10000]}
            >
              <Toc />
            </ResizableBox>
          </div>
          <div style={STYLES.content}>
            <Root history={this.props.history}>{this.props.children}</Root>
          </div>
          );
        </div>

        <div onClick={this.onCollapseClick} style={STYLES.collapse}>
          <Triangle
            direction={this.state.sidebarCollapsed ? 'right' : 'left'}
            style={{
              top: `calc((100vh - ${header_h} - ${footer_h})/2)`,
              position: 'absolute',
              marginLeft: -3,
            }}
          />
        </div>
        <style jsx="true">{`
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
          #sidebar {
            overflow-y: hidden;
            overflow-x: hidden;
          }
          #sidebar ::-webkit-scrollbar {
            display: none;
          }

          #sidebar:hover {
            overflow-y: auto;
            overflow-y: overlay;
          }
          #sidebar:hover ::-webkit-scrollbar {
            display: block;
          }

          #sidebar ::-webkit-scrollbar {
            -webkit-appearance: none;
          }
          #sidebar ::-webkit-scrollbar-thumb {
            box-shadow: inset 0 -2px, inset 0 -8px, inset 0 2px, inset 0 8px;
            min-height: 36px;
          }

          .react-resizable {
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          }

          .react-resizable.react-resizable-se-resize {
            /*
    workaround because react-resizable requires a initial "width" in px
    https://github.com/STRML/react-resizable/issues/6
   */
            width: 100% !important;
            max-width: 100%; /* removes scroll bar in windows version */
            max-height: 100%;
          }

          .react-resizable-ew-resize {
            padding-right: 15px;
          }

          .react-resizable-ew-resize .react-resizable-handle {
            position: absolute;
            width: 10px;
            top: 0px;
            right: 0px;
            margin-top: 0;
            cursor: -webkit-grabbing;
            background-color: #eee;
          }

          .react-resizable-ew-resize .react-resizable-handle:before {
            content: '\f07e';
            font-family: Icons;
          }

          .react-resizable-se-resize .react-resizable-handle {
            position: absolute;
            background-color: #0f0;
            height: 20px;
            bottom: 0;
            left: 0;
            width: 200px;
            cursor: row-resize;
          }
          .react-resizable-my-resize .react-resizable-handle {
            position: absolute;
            width: 100%;
            height: 10px;
            bottom: 0px;
            left: 0px;
            margin-top: 0;
            cursor: row-resize !important;
            background-color: #efe;
          }
          .react-resizable-handle {
            height: 100%;
            cursor: col-resize !important;
          }
        `}</style>
      </div>
    );
  }
}

export default function(){
  return(<QueryBrowserContainer><Home /></QueryBrowserContainer>)
}

