import React, { Component } from 'react';
import { Slider } from 'yo-component';
import MyRechart from './MyRechart';
import MyTable from './MyTable';
import _ from 'lodash';
import '../styles/tabChart.css';
import data from '../api/tabledata';

const dataCp = _.cloneDeep(data);

export default class LinkChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      dataSort: data,
      dataShow: data.slice(0, 10),
      activeRow: -1,
      dataStart: 0
    }
  }

  handlePage = (page, sorter) => {
    // console.log("sorter", sorter);
    let dataSort = _.cloneDeep(data);
    dataSort.sort((a,b) => {
      let result = 0;
      let aa = typeof a[sorter.field] ==="string" ? a[sorter.field].toLowerCase() : a[sorter.field];
      let bb = typeof b[sorter.field] ==="string" ? b[sorter.field].toLowerCase() : b[sorter.field];
      if (aa < bb) {
        result = -1;
      } else {
        result = 1;
      }
      if (result !== 0 && sorter.order === 'descend') {
        result = -result;
      }
      return result;
    });
    this.setState({
      dataSort: dataSort,
      dataShow: dataSort.slice(this.state.dataStart, this.state.dataStart+10)
    });
    // const res = datacp.map(item => item[sorter.field]);
  }

  handleChange = (value) => {
    this.setState({
      dataShow: this.state.dataSort.slice(value, value+10)
    });
  }

  chartCtrlTable = (isTooltipActive, activeTooltipIndex)  => {
    this.setState({
        activeRow: activeTooltipIndex
      });
  }

  render() {
    const { data, dataShow } = this.state;

    return (
      <div>
        <MyRechart data={dataShow} chartCtrlTable={this.chartCtrlTable} />
        <Slider defaultValue={0} max={data.length-1} onChange={this.handleChange} />
        <MyTable data={dataShow} handlePage={this.handlePage} activeRow={this.state.activeRow} />
      </div>
    )
  }
}