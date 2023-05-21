import React, { Component } from 'react';
import { Tag } from './Elem';
import  Link  from 'next/link';
import styled from '@emotion/styled'
import AceEditor from './Ace';
import myglobal from './myglobal'
const Toc_style = `
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
  border-bottom: solid #b03060 4px;
  text-shadow: 0px 2px 0 #b03060;
  border-radius: 0.3em;
  position: relative;
  -webkit-transition: all 0.1s ease-out; /* Safari 3.2+, Chrome */
  -moz-transition: all 0.1s ease-out; /* Firefox 4-15 */
  -o-transition: all 0.1s ease-out; /* Opera 10.5â12.00 */
  transition: all 0.1s ease-out; /* Firefox 16+, Opera 12.50+ */
  &:link {
    color: white;
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
    background-color: #c63b6f;
  }

  &:active {
    border-bottom: solid #b03060 1px;
    top: 4px;
    -webkit-transition: all 0 ease-out; /* Safari 3.2+, Chrome */
    -moz-transition: all 0 ease-out; /* Firefox 4-15 */
    -o-transition: all 0 ease-out; /* Opera 10.5â12.00 */
    transition: all 0 ease-out; /* Firefox 16+, Opera 12.50+ */
  }   
} 
`;
export default function Toc(){
  const onChange = newValue => {
    setState({
      style_box: newValue,
    });
  };
  const [state,setState]=React.useState({
      style_box: Toc_style,
      mode: 'css',
      displayAce: 'none',
    });
    return (
      <React.Fragment>
        <div className="content" style={{ position: 'relative' }}>
          <h1 className="content">Table of Contents</h1>
          <Tag css={state.style_box}>
            <Link href={myglobal.path+ "?no_layout"}>no layout</Link>
            <Link href={myglobal.path+"?display"}>the &quot;display&quot; property</Link>

            <Link href={myglobal.path+"?margin_auto"}>margin: auto;</Link>

            <Link href={myglobal.path+"?max_width"}>max-width</Link>

            <Link href={myglobal.path+"?box_model"}>the box model</Link>

            <Link href={myglobal.path+"?box_sizing"}>box-sizing</Link>

            <Link href={myglobal.path+"?position"}>position</Link>

            <Link href={myglobal.path+"?position_example"}>position example</Link>

            <Link href={myglobal.path+"?float"}>float</Link>

            <Link href={myglobal.path+"?clear"}>clear</Link>

            <Link href={myglobal.path+"?clearfix"}>the clearfix hack</Link>

            <Link href={myglobal.path+"?float_layout"}>float layout example</Link>

            <Link href={myglobal.path+"?percent"}>percent width</Link>

            <Link href={myglobal.path+"?media_queries"}>media queries</Link>

            <Link href={myglobal.path+"?inline_block"}>inline-block</Link>

            <Link href={myglobal.path+"?inline_block_layout"}>inline-block layout</Link>

            <Link href={myglobal.path+"?column"}>column</Link>

            <Link href={myglobal.path+"?flexbox"}>flexbox</Link>

            <Link href={myglobal.path+"?frameworks"}>css frameworks</Link>

            <Link href={myglobal.path+"?about"}>about this site</Link>
          </Tag>
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
                if (state.displayAce == 'none') {
                  setState({ displayAce: 'block' });
                } else {
                  setState({ displayAce: 'none' });
                }
              }}
            >
              edit style
            </button>
            <AceEditor
             
              style={{
                display: state.displayAce,
                width: '350px',
                height: '250px',
                border: 'solid gray 5px',
              }}
              mode={state.mode}
              theme="github"
              value={ state.style_box    }
              onChange={                onChange              }
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </React.Fragment>
    );
}
