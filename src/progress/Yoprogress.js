import React, { Component } from 'react';
import classNames from 'classnames';
import './progress.css';
import { Progress } from 'yo-component';

export default class Yoprogress extends Component {
  constructor(props) {
    super(props);
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
    return <div className="myprogress" id="progress1">
        <div className="myprogress-text myprogress-percent">30%</div>
        <Progress percent={30} showInfo={false} />
        <div className="myprogress-text myprogress-time myprogress-time-left">4m15s</div>
        <div className="myprogress-text myprogress-time myprogress-time-right">5h8m37s</div>
      </div>
  }
}