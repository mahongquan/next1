import React from 'react';
import PropTypes from 'proptypes';

class Button extends React.Component {
  render() {
    //this.context
    console.log("context render==")
    console.log(this.context);
    return (
      <button style={{ background: this.context.color }}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string,
};

class Message extends React.Component {
  render() {
    console.log(this.context);
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}
Message.contextTypes = {
  color: PropTypes.string,
};

class MessageList extends React.Component {
  getChildContext() {
    console.log("getChildContext");
    return { color: 'purple' };
  }

  render() {
    console.log("parent render=========")
    const children = this.props.messages.map((message, idx) => (
      <Message text={message.text} key={idx} />
    ));
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string,
};
export default MessageList;
