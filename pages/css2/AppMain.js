import React, { Component } from 'react';
import Elem, { Tag, NavWrapper, LinkPrev, LinkStyle, A } from './Elem';
import Ace from './Ace';
import AceEditor from './Ace';

import Draggable from 'react-draggable';
const css = `
#main{
  width:100vw;
  height:100vh;
  justify-content: space-between;
  flex-wrap:wrap;
  align-items: stretch;
  display:flex;
  flex-direction:column;
  overflow:hidden;
}
#header{
  height:50px;
  background-color:#777;
}

#footer{
  height:50px;
  background-color:#888;
}
#content{
  background-color:#999;
  justify-content: space-around;
  flex-wrap:wrap;
  align-items: stretch;
  display:flex;
  flex-direction:row;
  overflow:hidden;
  flex:1;
}
#sidebar{
 width:200px;
}
#split{
  width:10px;
  background-color:#bbb;
}
#body{
    flex:1;
    display:flex;
    flex-direction:column; 
    align-items: stretch;   
}
#edit
{
  flex:1;
}
#table{
  flex:1;
  background-color:#aaa;
}
`;
class Split extends Componentchat {
  constructor() {
    super();
  }
  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  onMouseUp = e => {
    console.log(e.clientX + ',' + e.clientY);
    if (this.drag) {
      this.dx = e.clientX - this.pre.x;
      this.dy = e.clientY - this.pre.y;
      if (typeof this.props.onDrag === 'function') {
        console.log(this.dx + ',' + this.dy);
        this.props.onDrag(this.dx, this.dy);
      }
    }
    this.drag = false;
  };
  onMouseDown = e => {
    console.log('mouseDown');
    this.pre = { x: e.clientX, y: e.clientY };
    this.dx = 0;
    this.dy = 0;
    this.drag = true;
  };
  render = () => {
    return <div onMouseDown={this.onMouseDown} id="split" />;
  };
}
class Root extends Componentchat {
  constructor() {
    super();
    this.state = {
      css: css,
      pane1width: '100px',
      pane1height: '100px',
      sidebarWidth: 200,
    };
    this.pane1 = React.createRef();
  }
  cssChange = newValue => {
    this.setState({
      css: newValue,
    });
  };
  onDrag = (dx, dy) => {
    console.log(dx);
    let neww = this.state.sidebarWidth + dx;
    if (neww < 0) neww = 0;
    this.setState({ sidebarWidth: neww });
  };
  render() {
    // console.log(this.props);
    return (
      <div style={{ position: 'relative' }}>
        <Tag css={this.state.css}>
          <div id="main">
            <div id="header">toolbar</div>
            <div id="content">
              <div id="sidebar" style={{ width: this.state.sidebarWidth }}>
                <AceEditor
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                  mode="css"
                  theme="github"
                  value={this.state.css}
                  onChange={this.cssChange}
                  name="editor1"
                  editorProps={{ $blockScrolling: true }}
                />
              </div>
              <Split onDrag={this.onDrag} />
              <div id="body">
                <div id="edit">
                  <AceEditor
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                    }}
                    mode="css"
                    theme="github"
                    value={this.state.css}
                    onChange={this.cssChange}
                    name="editor1"
                    editorProps={{ $blockScrolling: true }}
                  />
                </div>
                <div id="table">
                  <AceEditor
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                    }}
                    mode="css"
                    theme="github"
                    value={this.state.css}
                    onChange={this.cssChange}
                    name="editor1"
                    editorProps={{ $blockScrolling: true }}
                  />
                </div>
              </div>
            </div>
            <div id="footer">footer</div>
          </div>
        </Tag>
        <Ace css={this.state.css} cssChange={this.cssChange} />
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
        `}</style>
      </div>
    );
  }
}
export default Root;
