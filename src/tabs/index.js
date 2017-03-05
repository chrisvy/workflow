import React, { Component } from 'react';
import classNames from 'classnames';
import Titles from './Titles';
import Contents from './Contents';
import './tabs.css';
import { Progress } from 'antd';
import './progress.css';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      showList: {'0': true, '1': true, '2': true},
      notSaveState: {'0': true, '1': false},
      showMore: false
    };
  }

  showMore = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  }

  renderTooltip = (x, y, text) => {

  }

  render() {
     return <div>
     	<Titles showList={this.state.showList} notSaveState={this.state.notSaveState} showMore={this.showMore}/>
      <div className="myprogress">
        <div className="myprogress-text myprogress-percent">30%</div>
        <Progress percent={30} />
        <div className="myprogress-text myprogress-time myprogress-time-left">4m15s</div>
        <div className="myprogress-text myprogress-time myprogress-time-right">8m37s</div>
      </div>
     </div>
  }
}
