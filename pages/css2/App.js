/** @jsx jsx */;
import {ClassNames, css, jsx } from '@emotion/react'
import React, { Component } from 'react';
import Link from 'next/link';
import Elem, { Tag, NavWrapper, LinkPrev, LinkStyle, A } from './Elem';
import styled from '@emotion/styled'
import Ace from './Ace';
import { useRouter } from 'next/router';
import myglobal from './myglobal'
import About from './about';
import Box_model from './box_model';
import Box_sizing from './box_sizing';
import Clear from './clear';
import Clearfix from './clearfix';
import Column from './column';
import Display from './display';
import Flexbox from './flexbox';
import Float_layout from './float_layout';
import Float from './float';
import Frameworks from './frameworks';
import Home from './home';
import Inline_block_layout from './inline_block_layout';
import Inline_block from './inline_block';
import Margin_auto from './margin_auto';
import Max_width from './max_width';
import Media_queries from './media_queries';
import No_layout from './no_layout';
import Percent from './percent';
import Position_example from './position_example';
import Position from './position';
import Toc from './toc';
let css_global=css`
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
        `

const menu_style = `
background-color: whiteSmoke;
text-align: center;
>a{
  color: #8F8F8F;
  display: inline-block;
  padding: .5em 1em;
  text-shadow: 0 1px 0 #EDEDED;
  text-decoration: none;
  &:hover {
    background: rgb(220, 220, 220);
  }
  @media screen and (min-width: 601px) {
    display: block;
    padding: 0.2em 0;
  }
}
@media screen and (min-width: 601px) {
  position: absolute;
  top: -16px;
  left: -20px;
  width: 250px;
  padding-top: 2em;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: rotate(-35deg) translate(-92px, 22px); /* Safari 3.1+, Chrome */
  -moz-transform: rotate(-35deg) translate(-92px, 22px); /* Firefox 3.5-15 */
  -ms-transform: rotate(-35deg) translate(-92px, 22px); /* IE9+ */
  -o-transform: rotate(-35deg) translate(-92px, 22px); /* Opera 10.5-12.00 */
  transform: rotate(-35deg) translate(-92px, 22px); /* Firefox 16+, Opera 12.50+ */
}
`;
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
  'index',
  'no_layout',
  'display',
  'margin_auto',
  'max_width',
  'box_model',
  'box_sizing',
  'position',
  'position_example',
  'float',
  'clear',
  'clearfix',
  'float_layout',
  'percent',
  'media_queries',
  'inline_block',
  'inline_block_layout',
  'column',
  'flexbox',
  'frameworks',
  'about',
];
export default function Root(props){
  const [state,setState] = React.useState({
    style_box: menu_style,
    logo_style: logo_style,
  });
  const location = useRouter();
  const onChange = newValue => {
    setState({
      style_box: newValue,
    });
  };
  const onChange_logo = newValue => {
    setState({
      logo_style: newValue,
    });
  };
  const getPrevNext = (pathname) => {
    let prev, next, at;
    for (var i = pages.length-1; i >=0; i--) {
      if (pathname.indexOf(pages[i]) >= 0) {
        prev = i - 1;
        next = i + 1;
        if (prev >= 0) {
          prev = pages[prev];
        } else {
          prev = undefined;
        }
        if (next < pages.length) {
          next = pages[next];
        } else {
          next = undefined;
        }
        at = i;
        break;
      }
    }
    let zhengwen
    switch (pathname) {
      case "index":
        zhengwen=(<Home />);
        break;
      case "no_layout":
        zhengwen=(<No_layout />);
        break;
      case "display":
        zhengwen=(<Display />);
        break;
      case "margin_auto":
        zhengwen=(<Margin_auto />);
        break;
      case "max_width":
        zhengwen=(<Max_width />);
        break;
      case "box_model":
        zhengwen=(<Box_model />);
        break;
      case "box_sizing":
        zhengwen=(<Box_sizing />);
        break;
      case "position":
        zhengwen=(<Position />);
        break;
      case "position_example":
        zhengwen=(<Position_example />);
        break;
      case "float":
        zhengwen=(<Float />);
        break;
      case "clear":
        zhengwen=(<Clear />);
        break;
      case "clearfix":
        zhengwen=(<Clearfix />);
        break;
      case "float_layout":
        zhengwen=(<Float_layout />);
        break;
      case "percent":
        zhengwen=(<Percent />);
        break;
      case "media_queries":
        zhengwen=(<Media_queries />);
        break;
      case "inline_block":
        zhengwen=(<Inline_block />);
        break;
      case "inline_block_layout":
        zhengwen=(<Inline_block_layout />);
        break;
      case "column":
        zhengwen=(<Column />);
        break;
      case "flexbox":
        zhengwen=(<Flexbox />);
        break;
      case "frameworks":
        zhengwen=(<Frameworks />);
        break;
      case "about":
        zhengwen=(<About />);
        break;
      case "toc":
        zhengwen=(<Toc />);
        break;        
      default:
        zhengwen=(<Home />);
    }
    return [prev, next, at,zhengwen];
  };
    console.log("CSS layout app");
    console.log(myglobal);
    console.log(location);
    console.log(myglobal.path+"/toc");
    let pathname=location.asPath.split("?")[1];
    if(!pathname || pathname==""){
      pathname="index"
    }
    console.log("pathname",pathname);
    let visible_home, visible_toc, disable_home;
    if (pathname.indexOf('index') >= 0) {
      visible_home = 'hidden';
      disable_home = '';
    } else {
      visible_home = 'visible';
      disable_home = 'index';
    }
    if (pathname.indexOf('/toc') >= 0) {
      visible_toc = 'hidden';
    } else {
      visible_toc = 'visible';
    }
    var arr1 = getPrevNext(pathname);
    console.log(arr1);
    let prev = arr1[0];
    let next = arr1[1];
    let zhengwen=arr1[3];
    let i = arr1[2] + 1;
    if (prev) {
      prev = <LinkPrev href={myglobal.path+"?"+prev}>Previous</LinkPrev>;
    }
    if (next) {
      next = <LinkPrev href={myglobal.path+"?"+next}>Next</LinkPrev>;
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
      <div css={css_global}>
        <Tag css={state.logo_style} id="logo">
          <Link href={disable_home}>
            <img src="./images/logo.png" alt="logo" />
            <span>Learn CSS Layout</span>
          </Link>
        </Tag>
        <Tag css={state.style_box}>
          <Link style={{ marginRight: '1em', visibility: visible_home }} href={myglobal.path}>
            Home
          </Link>
          <Link style={{ visibility: visible_toc }} href={myglobal.path+"?toc"}>
            Table of Contents
          </Link>
        </Tag>
        <div id="container">{zhengwen}</div>
        {nav}
        <div style={{ minHeight: '100px' }} />
        <Ace css={state.logo_style} cssChange={onChange_logo} />
      </div>
    );
}
// export default Root;
