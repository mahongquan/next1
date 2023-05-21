import React from 'react';
import { Motion, spring } from 'react-motion';
import _ from 'lodash';
let range = _.range;

const gridWidth = 150;
const gridHeight = 150;
const grid = range(4).map(() => range(6));

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delta: [0, 0],
      mouse: [0, 0],
      isPressed: false,
      firstConfig: [60, 5],
      slider: { dragged: null, num: 0 },
      lastPressed: [0, 0],
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleMouseUp);
  }

  handleTouchStart = (pos, press, e) => {
    this.handleMouseDown(pos, press, e.touches[0]);
  };

  handleMouseDown = (pos, [pressX, pressY], { pageX, pageY }) => {
    this.setState({
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
      isPressed: true,
      lastPressed: pos,
    });
  };

  handleTouchMove = e => {
    if (this.state.isPressed) {
      e.preventDefault();
    }
    this.handleMouseMove(e.touches[0]);
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const {
      isPressed,
      delta: [dx, dy],
    } = this.state;
    if (isPressed) {
      this.setState({ mouse: [pageX - dx, pageY - dy] });
    }
  };

  handleMouseUp = () => {
    this.setState({
      isPressed: false,
      delta: [0, 0],
      slider: { dragged: null, num: 0 },
    });
  };

  handleChange = (constant, num, { target }) => {
    const {
      firstConfig: [s, d],
    } = this.state;
    if (constant === 'stiffness') {
      this.setState({
        firstConfig: [target.value - num * 30, d],
      });
    } else {
      this.setState({
        firstConfig: [s, target.value - num * 2],
      });
    }
  };

  handleMouseDownInput = (constant, num) => {
    this.setState({
      slider: { dragged: constant, num: num },
    });
  };

  render() {
    const {
      mouse,
      isPressed,
      lastPressed,
      firstConfig: [s0, d0],
      slider: { dragged, num },
    } = this.state;
    return (
      <div className="demo5">
        <style jsx="true">
          {`
            * {
              padding: 0;
              margin: 0;
              -webkit-user-select: none;
              -moz-user-select: none;
              user-select: none;
            }
            body {
              background-color: #ffffff;
              font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light',
                'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
              font-weight: 300;
            }
            h3 {
              margin: 5px 0 16px;
              font-size: 13px;
            }
            .demo5-outer {
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              display: -webkit-flex;
              -webkit-flex-direction: column;
              -webkit-justify-content: center;
              -webkit-align-items: center;
            }
            .demo5 {
              width: 900px;
              height: 600px;
              position: relative;
            }
            .demo5-cell {
              position: absolute;
              border: 1px solid #e4e4e4;
              display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              justify-content: center;
              display: -webkit-flex;
              -webkit-flex-wrap: wrap;
              -webkit-align-content: flex-start;
              -webkit-justify-content: center;
              padding: 6px;
              box-sizing: border-box;
            }
            .demo5-cell input {
              visibility: hidden;
              cursor: ew-resize;
            }
            .demo5-cell:hover input {
              visibility: visible;
            }
            .demo5-ball {
              width: 50px;
              height: 50px;
              border-radius: 99px;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              display: -webkit-flex;
              -webkit-justify-content: center;
              -webkit-align-items: center;
              -webkit-flex-direction: column;
              top: 0;
              left: 0;
              cursor: pointer;
              font-size: 12px;
              background-color: #fdc3c3;
              z-index: 1;
            }
            .demo5-ball-active {
              background-color: #ff8585;
            }
            .demo5-minus {
              padding-left: 4px;
              color: #cc2e2e;
            }
            .demo5-plus {
              padding-left: 4px;
              color: #39a11e;
            }
            .demo5-preset {
              display: flex;
              justify-content: space-around;
              display: -webkit-flex;
              -webkit-justify-content: space-around;
              padding: 0 2px 0 2px;
            }
          `}
        </style>
        {grid.map((row, i) => {
          return row.map((cell, j) => {
            const cellStyle = {
              top: gridHeight * i,
              left: gridWidth * j,
              width: gridWidth,
              height: gridHeight,
            };
            const stiffness = s0 + i * 30;
            const damping = d0 + j * 2;
            const motionStyle = isPressed
              ? { x: mouse[0], y: mouse[1] }
              : {
                  x: spring(gridWidth / 2 - 25, { stiffness, damping }),
                  y: spring(gridHeight / 2 - 25, { stiffness, damping }),
                };
            return (
              <div key={i + '' + j} style={cellStyle} className="demo5-cell">
                <input
                  type="range"
                  min={0}
                  max={300}
                  value={stiffness}
                  onMouseDown={this.handleMouseDownInput.bind(
                    null,
                    'stiffness',
                    i
                  )}
                  onChange={this.handleChange.bind(null, 'stiffness', i)}
                />
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={damping}
                  onMouseDown={this.handleMouseDownInput.bind(
                    null,
                    'damping',
                    j
                  )}
                  onChange={this.handleChange.bind(null, 'damping', j)}
                />
                <Motion style={motionStyle}>
                  {({ x, y }) => {
                    let thing;
                    if (dragged === 'stiffness') {
                      thing =
                        i < num ? (
                          <div className="demo5-minus">-{(num - i) * 30}</div>
                        ) : i > num ? (
                          <div className="demo5-plus">+{(i - num) * 30}</div>
                        ) : (
                          <div className="demo5-plus">0</div>
                        );
                    } else {
                      thing =
                        j < num ? (
                          <div className="demo5-minus">-{(num - j) * 2}</div>
                        ) : j > num ? (
                          <div className="demo5-plus">+{(j - num) * 2}</div>
                        ) : (
                          <div className="demo5-plus">0</div>
                        );
                    }
                    const active =
                      lastPressed[0] === i && lastPressed[1] === j
                        ? 'demo5-ball-active'
                        : '';
                    return (
                      <div
                        style={{
                          transform: `translate3d(${x}px, ${y}px, 0)`,
                          WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                        }}
                        className={'demo5-ball ' + active}
                        onMouseDown={this.handleMouseDown.bind(
                          null,
                          [i, j],
                          [x, y]
                        )}
                        onTouchStart={this.handleTouchStart.bind(
                          null,
                          [i, j],
                          [x, y]
                        )}
                      >
                        <div className="demo5-preset">
                          {stiffness}
                          {dragged === 'stiffness' && thing}
                        </div>
                        <div className="demo5-preset">
                          {damping}
                          {dragged === 'damping' && thing}
                        </div>
                      </div>
                    );
                  }}
                </Motion>
              </div>
            );
          });
        })}
      </div>
    );
  }
}
