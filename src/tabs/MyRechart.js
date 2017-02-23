import React from 'react';
// import { changeNumberOfData } from './utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';

const data = [
  { name: '09:00', meanTime: 30, actualTime: 24, amt: 24, range: [75, 20] },
  { name: '10:00', meanTime: 43, actualTime: 45, amt: 24, range: [90, 40] },
  { name: '11:00', meanTime: 32, actualTime: 13, amt: 24, range: 40 },
  { name: '12:00', meanTime: 32, actualTime: 47, amt: 24, range: 20 },
  { name: '13:00', meanTime: 42, actualTime: 39, amt: 24, range: 28 },
  { name: '14:00', meanTime: 31, actualTime: 48, amt: 24, range: [90, 20] },
  { name: '15:00', meanTime: 51, actualTime: 43, amt: 24, range: [28, 40] },
  { name: '16:00', meanTime: 41, actualTime: 48, amt: 24, range: 28 },
  { name: '17:00', meanTime: 45, actualTime: 43, amt: 24, range: 28 },
  { name: '18:00', meanTime: 41, actualTime: 41, amt: 24, range: [15, 60] },
];

const initialState = {
  data
};

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

export default React.createClass({
  displayName: 'LineChartDemo',

  getInitialState() {
    return initialState;
  },

  handleClick(data, e) {
    console.log(data);
  },

  renderLabel() {
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
  },

  render() {
    const { data } = this.state;

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
            >
              <XAxis dataKey='name' interval={0} label={"开始时间"} axisLine={false} tickLine={false} />
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
    );
  }
});