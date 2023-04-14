import {keyframes,ClassNames, css, jsx } from '@emotion/react'
import classNames from 'classnames';
import { Menu, MenuItem } from "./ContextMenu2";
import React from 'react'
import Dialog from './Dialog'
import Elem, { Tag } from './Elem';
// import "./styles.css";
const css_global=`
body {
  font-family: sans-serif;
  text-align: center;
  margin: 0;
}

.Dialog {
  background: white;
  color: black;
  padding: 15px;
  border-radius: 6px;
  margin: 0 15px;
}
.App {
  font-family: sans-serif;
  text-align: center;
}

.ContextMenu {
  outline: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 4px;
  border-radius: 8px;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items: baseline;
    justify-content: center;
    align-content:center;
}

.MenuItem {
  width: 100%;
  display: block;
}

.MenuItem {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
  margin: 0;
  outline: 0;
}

.MenuItem.open {
  background: #ddd;
}

.MenuItem:focus,
.MenuItem:not([disabled]):active {
  background: royalblue;
  color: white;
}
`
const css_va = `ul {
    display:flex;
    border: 1px solid red;
    padding: 0;
    list-style: none;
    background-color: #e8e8e9;
    align-items:center;
    justify-content: center;
    height:200px;
}
li {
    background-color: #8cacea;
    margin: 8px;
    padding: 4px;
    width:100px;
     overflow:hidden;
    :first-of-type
    { 
        line-height:1em;
        font-size:3em;
        height:100px;
    }
    :last-child
    { 
        line-height:1em;
        font-size:2em;
        height:200px;
    }
}

`;
export default function App() {
  const [state,setState]=React.useState({
    open:false,
    css_va:css_va,
    css_global:css_global,
    show_menu:false,
  })
  const newTab=()=>{
    setState((state)=>({...state,open:true}));
    console.log("new tab in main App")
  }
  console.log("App=================")
  console.log(state);
  return (
    <Elem mycss={state.css_global}>
      <h1>Floating UI Context Menu</h1>
      <p>Right click on the page!</p>
      <button onClick={()=>{
        setState((state)=>({...state,show_menu:true}));
      }}>show menu</button>
      <Menu open={state.show_menu} onOpenChange={(v)=>{
        setState((state)=>({...state,show_menu:v}));
      }}>
        <MenuItem onClick={newTab} label="open dialog"></MenuItem>
        <MenuItem onClick={()=>{
          console.log("new window")
        }}label="New window" />
        <MenuItem label="Close tab" disabled />
      </Menu>
      <Dialog open={state.open} onOpenChange={(v)=>{
          console.log("onOpenChange-----------------------------");
          console.log(v);
          setState((state)=>({...state,open:v}));
      }}>
            <h1 id={123}>This is a dialog!</h1>
            <p id={"hello"}>
              Now that we've got your attention, you can close 
            </p>
            <button onClick={()=>{
              setState((state)=>({...state,open:false}));
            }}>Close</button>
      </Dialog>
    </Elem>
  );
}
