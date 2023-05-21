import React, { Component } from 'react';
import App from './AppSplit';
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
import styled from '@emotion/styled'
const pages = [
  <Toc />,
  <Home />,
  <No_layout />,
  <Display />,
  <Margin_auto />,
  <Max_width />,
  <Box_model />,
  <Box_sizing />,
  <Position />,
  <Position_example />,
  <Float />,
  <Clear />,
  <Clearfix />,
  <Float_layout />,
  <Percent />,
  <Media_queries />,
  <Inline_block />,
  <Inline_block_layout />,
  <Column />,
  <Flexbox />,
  <Frameworks />,
  <About />,
];
export default function Root (){
  var [state,setState]=React.useState(0);
  const click_prev=()=>{
        var at=state;
        at =at - 1;
        if (at < 0) {
          at=0
        } 
        setState(at);
  };
  const click_next=()=>{
    var at=state;
    at =at + 1;
        if (at>pages.length-1) {
          at=pages.length-1
        } 
        setState(at);
  };
  var r=(<div>
          <App click_prev={click_prev} click_next={click_next } at={state} length={pages.length}>
           {pages[state]}
          </App></div>)
  return r;
}
