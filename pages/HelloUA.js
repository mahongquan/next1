import React from 'react';

class HelloUA extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return <div><div>Hello World</div><div>userAgent:{this.props.userAgent}</div></div>;
  }
}

export default HelloUA;
