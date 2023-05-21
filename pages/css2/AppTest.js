import React from 'react';
// import AppTabs from './AppTabs';
import AppTabs from './AppSplit';
class App extends React.Component {
  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <AppTabs />
      </div>
    );
  }
}
export default App;
