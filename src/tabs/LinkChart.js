import React, { Component } from 'react';
import MyRechart from './MyRechart';
import MyTable from './MyTable';
import _ from 'lodash';

const data = [
  { nodeNum: 15, workNum: "w15", executor: "admin", startTime: "2016-12-08 18:00 00s", endTime: "2016-12-08 18:00 04s", meanTime: 6, actualTime: 4, status: "running" },
  { nodeNum: 14, workNum: "w14", executor: "laiyy", startTime: "2016-12-08 17:00 00s", endTime: "2016-12-08 17:00 06s", meanTime: 4, actualTime: 6, status: "running" },
  { nodeNum: 13, workNum: "w13", executor: "admin", startTime: "2016-12-08 16:00 00s", endTime: "2016-12-08 16:00 10s", meanTime: 5, actualTime: 10, status: "suspend" },
  { nodeNum: 12, workNum: "w12", executor: "admin", startTime: "2016-12-08 15:00 00s", endTime: "2016-12-08 15:00 03s", meanTime: 6, actualTime: 3, status: "success" },
  { nodeNum: 11, workNum: "w11", executor: "admin", startTime: "2016-12-08 14:00 00s", endTime: "2016-12-08 14:00 04s", meanTime: 5, actualTime: 4, status: "success" },
  { nodeNum: 10, workNum: "w10", executor: "admin", startTime: "2016-12-08 13:00 00s", endTime: "2016-12-08 13:00 09s", meanTime: 6, actualTime: 9, status: "success" },
  { nodeNum: 9, workNum: "w9", executor: "admin", startTime: "2016-12-08 12:00 00s", endTime: "2016-12-08 12:00 04s", meanTime: 6, actualTime: 4, status: "success" },
  { nodeNum: 8, workNum: "w8", executor: "admin", startTime: "2016-12-08 11:00 00s", endTime: "2016-12-08 11:00 06s", meanTime: 6, actualTime: 6, status: "success" },
  { nodeNum: 7, workNum: "w7", executor: "admin", startTime: "2016-12-08 10:00 00s", endTime: "2016-12-08 10:00 04s", meanTime: 5, actualTime: 4, status: "killed" },
  { nodeNum: 6, workNum: "w6", executor: "admin", startTime: "2016-12-08 09:00 00s", endTime: "2016-12-08 09:00 08s", meanTime: 6, actualTime: 8, status: "success" },
  { nodeNum: 5, workNum: "w5", executor: "admin", startTime: "2016-12-08 08:00 00s", endTime: "2016-12-08 08:00 08s", meanTime: 6, actualTime: 8, status: "success" },
  { nodeNum: 4, workNum: "w4", executor: "admin", startTime: "2016-12-08 07:00 00s", endTime: "2016-12-08 07:00 09s", meanTime: 7, actualTime: 9, status: "success" },
  { nodeNum: 3, workNum: "w3", executor: "admin", startTime: "2016-12-08 06:00 00s", endTime: "2016-12-08 06:00 08s", meanTime: 6, actualTime: 8, status: "success" },
  { nodeNum: 2, workNum: "w2", executor: "admin", startTime: "2016-12-08 05:00 00s", endTime: "2016-12-08 05:00 05s", meanTime: 8, actualTime: 5, status: "success" },
  { nodeNum: 1, workNum: "w1", executor: "admin", startTime: "2016-12-08 04:00 00s", endTime: "2016-12-08 04:00 08s", meanTime: 6, actualTime: 8, status: "success" },
  { nodeNum: 0, workNum: "w0", executor: "admin", startTime: "2016-12-08 03:00 00s", endTime: "2016-12-08 03:00 03s", meanTime: 4, actualTime: 3, status: "success" }
];
const dataCp = _.cloneDeep(data);

export default class LinkChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      chartData: data.slice(0, 10),
      activeRow: -1
    }
  }

  handlePage = (page, sorter) => {
    // console.log("sorter", sorter);
    let datacp = _.cloneDeep(data);
    datacp.sort((a,b) => {
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
      chartData: dataCp.slice(page.pageSize * (page.current - 1), page.pageSize * page.current)
    });
    const res = datacp.map(item => item[sorter.field]);
  }

  chartCtrlTable = (isTooltipActive, activeTooltipIndex)  => {
    // console.log("test", isTooltipActive, activeTooltipIndex);
    // if (isTooltipActive) {
    //   this.setState({
    //     activeRow: activeTooltipIndex
    //   });
    // } else {
    //   this.setState({
    //     activeRow: -1
    //   });
    // }
    this.setState({
        activeRow: activeTooltipIndex
      });
  }

  render() {
    const { data, chartData } = this.state;

    return (
      <div>
        <MyRechart data={chartData} chartCtrlTable={this.chartCtrlTable} />
        <MyTable data={data} handlePage={this.handlePage} activeRow={this.state.activeRow} />
      </div>
    )
  }
}