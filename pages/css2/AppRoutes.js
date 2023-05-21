import React, { Component } from 'react';
import App from './App';
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
export default class Root extends Component{
  constructor() {
    super();
  }
  render() {
    const theme = { red: '#D64078', green: '#96C02E', orange: '#FDC72F' };
    return (
        <App>
        </App>
    );
  }
}
