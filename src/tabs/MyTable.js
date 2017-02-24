import React, { Component } from 'react';
import classNames from 'classnames';
import { Table, Icon, Tag } from 'antd';
import './table.css';

export default class MyTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
	    sortedInfo: null
	  }
  }

  handleChange = (pagination, filters, sorter) => {
    //pagination: {pageSize: 10, current: 2}
    // console.log("sorter", sorter);
    this.setState({
      sortedInfo: sorter
    });
    this.props.handlePage(pagination, sorter);
  }

  handleRowClick = (record, index) => {
  	console.log("handleRowClick", index);
  }

  renderStatus = (text) => {
    switch (text) {
      case 'running':
        return <Tag color="#72C4E2">{text}</Tag>
      case 'success':
        return <Tag color="#1AB394">{text}</Tag>
      case 'suspend':
        return <Tag color="#F8AC59">{text}</Tag>
      case 'killd':
        return <Tag color="#ED5565">{text}</Tag>
      default:
        return <Tag color="#1AB394">{text}</Tag>
    }
  }

  mySorter = (sorter, a, b) => {
    let result = 0;
    let aa = typeof a[sorter.field] ==="string" ? a[sorter.field].toLowerCase() : a[sorter.field];
    let bb = typeof b[sorter.field] ==="string" ? b[sorter.field].toLowerCase() : b[sorter.field];
    if (aa < bb) {
      result = -1;
    } else {
      result = 1;
    }
    return result;
  }

  render() {
    const { data } = this.props;
  	let { sortedInfo } = this.state;
		sortedInfo = sortedInfo || {};
		const columns = [{
      title: '节点运行编号',
      dataIndex: 'nodeNum',
      key: 'nodeNum',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),//(a, b) => a.nodeNum - b.nodeNum
      sortOrder: sortedInfo.columnKey === 'nodeNum' && sortedInfo.order,
    }, {
      title: '工作流运行编号',
      dataIndex: 'workNum',
      key: 'workNum',
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),
      sortOrder: sortedInfo.columnKey === 'workNum' && sortedInfo.order,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        let statusTag = null;
        switch (text) {
          case 'running':
            statusTag = <Tag color="#72C4E2">{text}</Tag>
            break
          case 'success':
            statusTag = <Tag color="#1AB394">{text}</Tag>
            break
          case 'suspend':
            statusTag = <Tag color="#F8AC59">{text}</Tag>
            break
          case 'killed':
            statusTag = <Tag color="#ED5565">{text}</Tag>
            break
          default:
            statusTag = <Tag color="#1AB394">{text}</Tag>
        }
        return statusTag
      },
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
    }, {
      title: '执行用户',
      dataIndex: 'executor',
      key: 'executor',
      sorter: (a, b) => this.mySorter(sortedInfo, a, b),
      sortOrder: sortedInfo.columnKey === 'executor' && sortedInfo.order,
    }];
    return <div className="table-box">
    	<Table
        rowKey = 'nodeNum'
	    	columns={columns} 
	    	dataSource={data} 
        pagination={{ pageSize: 10 }}
	    	bordered
	    	onRowClick={this.handleRowClick}
	    	onChange={this.handleChange} 
	    />
    </div>
  }
}
