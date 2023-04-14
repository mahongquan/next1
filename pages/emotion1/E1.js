import React from 'react';
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import E2 from './E2'
import E3 from './E3'
const color = 'blue';
const css1=css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `;
console.log(css1);
class Css1 extends  React.Component{
  render(){
return(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
);}}

const Button = styled.button`
  padding: 32px;
  #background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`
const Div1=styled.div`
      padding: 32px;
      #background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      color:black;
      &:hover {
        color: blue;
      }
    `
export default class Card extends React.Component{
  render(){
return(
  <div>
  <Div1>
    Hover to change color.
  </Div1>
  <Button> hello</Button>
  <E2 />
  <E3 />
  </div>
);
}}

