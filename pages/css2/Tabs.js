import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AppQuery from './AppQuery';
import AppD from './AppD';
import AppSeman from './Seman_Test';
import AppContext from './AppContext';
import TableEx from './AppGridExample';
import SS from './SS';
import Layout1 from './MotionDemo';

class App extends React.Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>AceEditor & GridExample</Tab>
          <Tab>Semantic-ui</Tab>
          <Tab>Motion Examples</Tab>
          <Tab>storm diagrams</Tab>
          <Tab>react context</Tab>
          <Tab>Virtual Table Demo</Tab>
          <Tab>SS</Tab>
        </TabList>
        <TabPanel>
          <AppQuery />
        </TabPanel>
        <TabPanel>
          <AppSeman />
        </TabPanel>
        <TabPanel>
          <Layout1 />
        </TabPanel>
        <TabPanel>
          <AppD />
        </TabPanel>
        <TabPanel>
          <AppContext />
        </TabPanel>
        <TabPanel>
          <TableEx />
        </TabPanel>
        <TabPanel>
          <SS />
        </TabPanel>
      </Tabs>
    );
  }
}
export default App;
