import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

const leavingSpringConfig = { stiffness: 60, damping: 15 };

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouse: [], now: 't' + 0 };
  }

  handleMouseMove = ({ pageX, pageY }) => {
    // Make sure the state is queued and not batched.
    this.setState(() => {
      return {
        mouse: [pageX - 25, pageY - 25],
        now: 't' + Date.now(),
      };
    });
  };

  handleTouchMove = e => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  willLeave = styleCell => {
    return {
      ...styleCell.style,
      opacity: spring(0, leavingSpringConfig),
      scale: spring(2, leavingSpringConfig),
    };
  };

  render() {
    const {
      mouse: [mouseX, mouseY],
      now,
    } = this.state;
    const styles =
      mouseX == null
        ? []
        : [
            {
              key: now,
              style: {
                opacity: spring(1),
                scale: spring(0),
                x: spring(mouseX),
                y: spring(mouseY),
              },
            },
          ];
    return (
      <div>
        <TransitionMotion willLeave={this.willLeave} styles={styles}>
          {circles => {
            console.log(circles);
            return (
              <div
                onMouseMove={this.handleMouseMove}
                onTouchMove={this.handleTouchMove}
                className="demo7"
              >
                {circles.map(({ key, style: { opacity, scale, x, y } }) => (
                  <div
                    key={key}
                    className="demo7-ball"
                    style={{
                      opacity: opacity,
                      scale: scale,
                      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                      WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    }}
                  />
                ))}
              </div>
            );
          }}
        </TransitionMotion>
        <style jsx="true">{`
          * {
            padding: 0;
            margin: 0;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }
          .demo7 {
            background-color: #1b1b1b;
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .demo7-ball {
            width: 50px;
            height: 50px;
            border-radius: 99px;
            position: absolute;
            border: 1px solid lightblue;
          }
        `}</style>
      </div>
    );
  }
}
