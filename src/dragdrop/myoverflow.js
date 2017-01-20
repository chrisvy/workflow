import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
const TabPane = Tabs.TabPane;
import Board from './Board';

const Myoverflow = React.createClass({
  getInitialState() {
    this.newTabIndex = 0;
    const panes = [
      { title: 'text_workflow', lastModified: {user: "admin", time: "2016-10-31 15:27:59"}, state: "dispatching", key: '1' },
      { title: 'text_phone', lastModified: {user: "chris", time: "2016-12-31 14:23:28"}, key: '2' },
    ];
    return {
      activeKey: panes[0].key,
      panes,
    };
  },
  onChange(activeKey) {
    this.setState({ activeKey });
  },
  onEdit(targetKey, action) {
    this[action](targetKey);
  },
  add() {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', lastModified: {}, state: "dispatching", key: activeKey });
    this.setState({ panes, activeKey });
  },
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  },
  render() {
    const pane = this.state.panes[0];
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {
          <TabPane tab={pane.title} key={pane.key}>最后修改人：{pane.lastModified.user}  最后修改时间：{pane.lastModified.time} 状态：{pane.state}
            <Board />
          </TabPane>
        }
      </Tabs>
    );
  },
});

export default Myoverflow