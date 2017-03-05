import React, { Component } from 'react';
import classNames from 'classnames';
import Titles from './Titles';
import Contents from './Contents';
import './tabs.css';
import { Progress, Tooltip } from 'antd';
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

  componentDidMount = () => {
    const probox = document.getElementById("progress1");
    const inner = probox.getElementsByClassName("ant-progress-inner");
    // const bg = probox.getElementsByClassName("ant-progress-bg");
    const fullwidth = inner[0].offsetWidth;
    const fullleft = inner[0].scrollLeft;
    // const activewidth = bg[0].offsetWidth;
    console.log("test", fullwidth, fullleft);
    const percent = probox.getElementsByClassName("myprogress-percent");
    percent[0].style.left = fullwidth*0.3+"px";
    // percent[0].style.transform = "translate(" + fullwidth*0.3 + "px, 0)";
    const left = probox.getElementsByClassName("myprogress-time-left");
    left[0].style.left = fullwidth*0.3*0.5+"px";
    const right = probox.getElementsByClassName("myprogress-time-right");
    right[0].style.left = fullwidth*(0.3+0.7*0.5)+"px";
  }

  render() {
     return <div>
     	<Titles showList={this.state.showList} notSaveState={this.state.notSaveState} showMore={this.showMore}/>
      <div className="myprogress" id="progress1">
        <div className="myprogress-text myprogress-percent">30%</div>
        <Progress percent={30} showInfo={false} />
        <div className="myprogress-text myprogress-time myprogress-time-left">4m15s</div>
        <div className="myprogress-text myprogress-time myprogress-time-right">8m37s</div>
      </div>
      <div>
        <Tooltip title="prompt text" visible={true}>
          <Progress percent={30} />
        </Tooltip>
      </div>
     </div>
  }
}
