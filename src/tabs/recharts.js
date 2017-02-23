import React from 'react';
// import { changeNumberOfData } from './utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';

const data = [
  { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
  { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
  { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
  { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
  { name: 'Page E', uv: 278, pv: 3908, amt: 2400, uvError: 28 },
  { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
  { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
  { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
];

const initilaState = {
  data
};

export default React.createClass({
  displayName: 'LineChartDemo',

  getInitialState() {
    return initilaState;
  },

  handleClick(data, e) {
    console.log(data);
  },

  render() {
    const { data } = this.state;

    return (
      <div className='line-charts'>

        <p>LineChart with two y-axes</p>
        <div className='line-chart-wrapper' style={{ padding: 40 }}>
          <LineChart
            width={400}
            height={400}
            data={data}
            margin={{top: 10, bottom: 10, left: 30, right: 30}}
            onClick={this.handleClick}
          >
            <XAxis dataKey='name' interval="preserveStartEnd" />
            <XAxis />
            <Tooltip/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Line type='monotone' dataKey='uv' stroke='#ff7300' yAxisId={0} activeDot={{fill: '#ff7300', stroke: 'none'}}/>
            <Line type='monotone' dataKey='pv' stroke='#387908' yAxisId={1} activeDot={{fill: '#387908', stroke: 'none', r: 6}}/>
          </LineChart>
        </div>
      </div>
    );
  }
});