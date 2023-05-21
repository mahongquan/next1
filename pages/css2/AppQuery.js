import Immutable from 'immutable';
import PropTypes from 'proptypes';
import React from 'react';
import { ResizableBox } from 'react-resizable';
import AceEditor from './Ace';
import 'brace/mode/sql';
import 'brace/theme/github';
import GridExample from './GridExample';
import { generateRandomList } from './demo/utils';

// console.log("Immutable");
// console.log(Immutable);

const list = Immutable.List(generateRandomList());
class App extends React.Component {
  state = { rw: window.innerWidth, rh: 500 };
  getChildContext() {
    // console.log("getChildContext");
    // console.log(list);

    return { list: list }; //[["a"],["b"],["c"]]};
  }
  componentWillUnmount() {
    // $(this.refs.previewModal).modal('hide');
  }

  render() {
    return (
      <div
        style={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          backgroundColor: '#777',
        }}
      >
        <ResizableBox
          style={{ width: '100%', height: this.state.rh }}
          onResizeStop={(e, data) => {
            let w, h;
            w = data.size.width;
            h = data.size.height;
            if (w > window.innerWidth) {
              w = window.innerWidth;
            }
            if (h > 300) {
              h = 300;
            }
            this.setState({ rh: h });
          }}
          axis="y"
          handleSize={[20, 20]}
          width={this.state.rw}
          height={this.state.rh}
        >
          <div
            style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}
          >
            hi
          </div>
        </ResizableBox>
        <div style={{ flex: 1 }}>
          <GridExample />
        </div>
      </div>
    );
  }
}
App.childContextTypes = {
  list: PropTypes.instanceOf(Object),
};
export default App;
