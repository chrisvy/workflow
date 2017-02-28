import React, { Component } from 'react';
// import { changeNumberOfData } from './utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';
import _ from 'lodash';
import { eventCenter, SYNC_EVENT } from 'recharts/lib/util/Events';

const MeanDot = React.createClass({
  render () {
    const {cx, cy, stroke, payload} = this.props;
    let dotR = 6;
    return (
      <svg x={cx - dotR} y={cy - dotR} width={2*dotR} height={2*dotR} viewBox="0 0 1024 1024" fill="#C1C1C1" >
        <circle cx="512" cy='512' r='258' />
      </svg>
    );
  }
});

const ActualDot = React.createClass({
  render () {
    const {cx, cy, stroke, payload} = this.props;
    let dotR = 6;
    if (payload.actualTime > payload.meanTime) {
      return (
        <svg x={cx - dotR} y={cy - dotR} width={2*dotR} height={2*dotR} viewBox="0 0 1024 1024" fill="#F8AC59" >
          <circle cx="512" cy='512' r='258' />
        </svg>
      );
    } else {
      return (
        <svg x={cx - dotR} y={cy - dotR} width={2*dotR} height={2*dotR} viewBox="0 0 1024 1024" fill="#84B9ED" >
          <circle cx="512" cy='512' r='258' />
        </svg>
      );
    }

  }
});

const ActiveActualDot = React.createClass({
  render () {
    const {cx, cy, stroke, payload} = this.props;
    let dotR = 10;
    if (payload.actualTime > payload.meanTime) {
      return (
        <svg x={cx - dotR} y={cy - dotR} width={2*dotR} height={2*dotR} viewBox="0 0 1024 1024" fill="#F8AC59" >
          <circle cx="512" cy='512' r='258' />
        </svg>
      );
    } else {
      return (
        <svg x={cx - dotR} y={cy - dotR} width={2*dotR} height={2*dotR} viewBox="0 0 1024 1024" fill="#84B9ED" >
          <circle cx="512" cy='512' r='258' />
        </svg>
      );
    }

  }
});

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" >{payload.value.split(" ")[1]}</text>
      </g>
    );
  }
});

export default class MyRechart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipActive: false,
      activeTooltipIndex: undefined
    }
  }

  handleClick = (moveData, e) => {
    if (moveData !== null) {
      const { isTooltipActive, activeTooltipIndex } = moveData;
      // console.log(data);
      const { chartCtrlTable } = this.props;
      chartCtrlTable(isTooltipActive, activeTooltipIndex);
    }
  }

  handleMouseEnter = (data, e) => {//失效，并没有触发该事件
    console.log("ha", data);
  }

  fn = _.throttle((isTooltipActive, activeTooltipIndex) => {
    const { chartCtrlTable } = this.props;
    // console.log(2, "move inner");
    chartCtrlTable(isTooltipActive, activeTooltipIndex)
  }, 200)

  handleMouseMove = (moveData, e) => {
    const { isTooltipActive, activeTooltipIndex } = moveData;
    // console.log(1, "move", isTooltipActive, activeTooltipIndex);
    // this.fn(isTooltipActive, activeTooltipIndex);
    const { chartCtrlTable } = this.props;
    // chartCtrlTable(isTooltipActive, activeTooltipIndex);
    // this.setState({
    //   isTooltipActive, activeTooltipIndex
    // });
  }

  mycomponentWillUpdate = (nextProps, nextState) => {
    // console.log("componentWillUpdate");
    const { isTooltipActive, activeTooltipIndex } = nextState;
    if (!isTooltipActive) {
      eventCenter.emit(SYNC_EVENT, "anyId", "recharts8", {
        isTooltipActive: false
      });
      return
    }
    const { data } = nextProps;
    // console.log("handleRowHover", data);
    const rechartData = {
      chartX: 70,//this seem to be useless
      chartY: 230,
      activeTooltipIndex: activeTooltipIndex,//actually, this one is used to calcute ths chartX
      activeLabel: data[activeTooltipIndex]["startTime"],
      activePayload: [{
        color:"#C1C1C1",
        dataKey:"meanTime",
        fill:"#fff",
        formatter:undefined,
        name:"平均耗时",
        payload: data[activeTooltipIndex],
        stroke:"#C1C1C1",
        strokeWidth:3,
        unit:undefined,
        value:6
      },{
        color:"#84B9ED",
        dataKey:"actualTime",
        fill:"#fff",
        formatter:undefined,
        name:"实时耗时",
        payload: data[activeTooltipIndex],
        stroke:"#84B9ED",
        strokeWidth:3,
        unit:undefined,
        value:4
      }],
      activeCoordinate: {x: 70, y: 230},
      isTooltipActive:true
    };
    eventCenter.emit(SYNC_EVENT, "anyId", "recharts8", rechartData);
    console.log(SYNC_EVENT, "anyId", "recharts8", rechartData);
  }
  
  // componentWillUnmount = () => {
  //   console.log("componentWillUnmount");
  // }

  handleMouseLeave = (data, e) => {
    // console.log(3, "leave", data);
    const { isTooltipActive, activeTooltipIndex } = data;
    const { chartCtrlTable } = this.props;
    // console.log("leave chartCtrlTable", chartCtrlTable);
    chartCtrlTable(isTooltipActive, activeTooltipIndex);
  }

  renderLabel = () => {
    const status = [{text: "失败", stroke: "#BE0000"},{text: "手动停止", stroke: "#ED5565"},{text: "暂停中", stroke: "#F8AC59"},{text: "进行中", stroke: "#72C4E2"},{text: "成功", stroke: "#72C4E2"}];
    return status.map((item, index) => <li className="recharts-legend-item-addon" key={"chart-label"+index} >
        <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1" >
          <path strokeWidth="4" fill="none" stroke={item.stroke} d="M10.666666666666666,16
              A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
              M21.333333333333332,16
              A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" className="recharts-legend-icon"></path>
        </svg>
        <span className="recharts-legend-item-text">{item.text}</span>
      </li>);
  }

  render() {
    const { data } = this.props;
    // console.log(this.props, data);

    return (
      <div className='line-charts'>
        <div className='line-chart-wrapper' >
        <div className="line-chart-title">作业运行统计图</div>
          <div className="recharts-legend-wrapper-addon" >
          <ul className="recharts-default-legend-addon" >
            {
              this.renderLabel()
            }
          </ul>
          </div>
          <ResponsiveContainer width="90%" height={300}>
            <LineChart
              data={data}
              margin={{top: 10, bottom: 10, left: 10, right: 10}}
              onClick={this.handleClick}
              onMouseMove={this.handleMouseMove}
              onMouseLeave={this.handleMouseLeave}
              syncId="anyId"
            >
              <XAxis dataKey='startTime' interval={0} label={"开始时间"} axisLine={false} tickLine={false} tick={<CustomizedAxisTick/>} />
              <YAxis label={"耗时"} axisLine={false} tickLine={false} />
              <Tooltip/>
              <Legend align="right" verticalAlign="top" height={36}/>
              <CartesianGrid stroke='#f5f5f5' />
              <Line type='linear' dataKey='meanTime' stroke='#C1C1C1' strokeWidth={3} dot={<MeanDot />} activeDot={{fill: '#C1C1C1', stroke: 'none'}} name={"平均耗时"} />
              <Line type='linear' dataKey='actualTime' stroke='#84B9ED' strokeWidth={3} dot={<ActualDot />} activeDot={<ActiveActualDot />} name={"实际耗时"} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}