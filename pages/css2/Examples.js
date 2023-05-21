import React, { Component } from 'react';
// import { render } from 'react-dom';
import SplitPane from 'react-split-pane';

export const SimpleNestedExample = () => {
  return (
    <SplitPane split="vertical" className="primary">
      <div />
      <SplitPane split="horizontal">
        <div>aaaaaaaaaaaa</div>
        <div>bbbbbbbbbbbb</div>
      </SplitPane>
    </SplitPane>
  );
};

export const BasicVerticalExample = () => {
  return (
    <SplitPane split="vertical">
      <div />
      <div />
    </SplitPane>
  );
};

export const BasicHorizontalExample = () => {
  return (
    <SplitPane split="horizontal">
      <div />
      <div />
    </SplitPane>
  );
};

export const BasicStepExample = () => {
  return (
    <SplitPane
      split="vertical"
      step={50}
      minSize={200}
      maxSize={1000}
      onDragStarted={() => (document.body.style.cursor = 'col-resize')}
      onDragFinished={() => (document.body.style.cursor = 'auto')}
    >
      <div />
      <div />
    </SplitPane>
  );
};

export const PercentageVerticalExample = () => {
  return (
    <SplitPane defaultSize="50%">
      <div />
      <div />
    </SplitPane>
  );
};

export const PercentageHorizontalExample = () => {
  return (
    <SplitPane defaultSize="50%" split="horizontal">
      <div />
      <div />
    </SplitPane>
  );
};

export const VerticallyNestedInContainerExample = () => {
  return (
    <SplitPane defaultSize="40%" split="vertical">
      <div />
      <div />
    </SplitPane>
  );
};

export const HorizontallyNestedInContainerExample = () => {
  return (
    <SplitPane defaultSize="40%" split="horizontal">
      <div />
      <div />
    </SplitPane>
  );
};

export const MultipleVerticalExample = () => {
  return (
    <SplitPane split="vertical" defaultSize="33%">
      <div />
      <SplitPane split="vertical" defaultSize="50%">
        <div />
        <div />
      </SplitPane>
    </SplitPane>
  );
};

export const MultipleHorizontalExample = () => {
  return (
    <SplitPane split="horizontal" defaultSize="33%">
      <div />
      <SplitPane split="horizontal" defaultSize="50%">
        <div />
        <div />
      </SplitPane>
    </SplitPane>
  );
};

export const SubComponentExample = () => {
  return (
    <div className="parent">
      <div className="header">Header</div>
      <div className="wrapper">
        <SplitPane split="horizontal" defaultSize="50%">
          <div />
          <div />
        </SplitPane>
      </div>
    </div>
  );
};

export const InlineStyleExample = () => {
  const styleA = { background: '#eee' };
  const styleB = { background: '#aaa4ba' };
  const styleC = { background: '#000' };
  const styleD = { padding: '2em', fontStyle: 'italic' };
  return (
    <SplitPane
      split="vertical"
      minSize={50}
      maxSize={300}
      defaultSize={100}
      className="primary"
      pane1Style={styleA}
      resizerStyle={styleC}
    >
      <div />
      <SplitPane split="horizontal" paneStyle={styleD} pane2Style={styleB}>
        <div>Hello...</div>
        <div> ...world.</div>
      </SplitPane>
    </SplitPane>
  );
};

export default class SnapToPositionExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: undefined,
      dragging: false,
    };
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDragStart() {
    this.setState({
      dragging: true,
    });
  }

  handleDragEnd() {
    this.setState({
      dragging: false,
    });
    setTimeout(() => {
      this.setState({ size: undefined });
    }, 0);
  }

  handleDrag(width) {
    if (width >= 300 && width <= 400) {
      this.setState({ size: 300 });
    } else if (width > 400 && width <= 500) {
      this.setState({ size: 500 });
    } else {
      this.setState({ size: undefined });
    }
  }

  render() {
    const dropWarnStyle = {
      backgroundColor: 'yellow',
      left: 300,
      width: 200,
    };
    const centeredTextStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    };
    return (
      <div style={{ height: '100%' }}>
        <SplitPane
          size={this.state.dragging ? undefined : this.state.size}
          onChange={this.handleDrag}
          onDragStarted={this.handleDragStart}
          onDragFinished={this.handleDragEnd}
        >
          <div
            style={{
              backgroundColor: 'blue',
              height: '100%',
              zIndex: 1,
              opacity: 0.1,
            }}
          />
          <div />
        </SplitPane>
        <div
          style={Object.assign({}, centeredTextStyle, { left: 0, width: 300 })}
        >
          Can drop anywhere
        </div>
        <div style={Object.assign({}, centeredTextStyle, dropWarnStyle)}>
          Will snap to edges
        </div>
        <div
          style={Object.assign({}, centeredTextStyle, {
            left: 500,
            width: 'calc(100% - 500px)',
          })}
        >
          Can drop anywhere
        </div>
      </div>
    );
  }
}
