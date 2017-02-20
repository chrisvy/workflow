import React, { Component } from 'react';
import classNames from 'classnames';
import Titles from './Titles';
import Contents from './Contents';
import './tabs.css';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panes: [{id: 0, title: '文件校验任务'}, {id: 1, title: '政企应用层业务'}, {id: 2, title: '新业务'}],
      activeKey: 0,
      constents: [],
      showList: {'0': true, '1': true, '2': true},
      saveState: {'0': true, '1': false}
    };
  }

  handleChangeTab = (newKay) => {
  	console.log("newKay", newKay);
  	this.setState({
  		activeKey: newKay
  	});
  }

  handleClose = (id) => (e) => {
  	e.stopPropagation();
  	this.setState({
  		showList: {
  			...this.state.showList,
  			[id]: false
  		}
  	});
  }

  render() {
     return <div>
     	<Titles panes={this.state.panes} activeKey={this.state.activeKey} showList={this.state.showList} saveState={this.state.saveState} handleChangeTab={this.handleChangeTab} handleClose={this.handleClose}/>
     	<Contents/ >
     </div>
  }
}
