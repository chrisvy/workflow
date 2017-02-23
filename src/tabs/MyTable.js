import React, { Component } from 'react';
import classNames from 'classnames';
import { Table, Icon, Tag } from 'antd';
import './table.css';

const data = [{
  key: '1',
  name: 'John Brown',
  status: 'running',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  status: 'success',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  status: 'killed',
  address: 'Sidney No. 1 Lake Park',
}];

export default class MyTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
	    sortedInfo: null
	  }
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter
    });
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

  render() {
  	let { sortedInfo } = this.state;
		sortedInfo = sortedInfo || {};
		const columns = [{
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.key - b.key,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Status',
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
      sorter: (a, b) => a.status - b.status,
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }];
    return <div className="table-box">
    	<Table 
	    	columns={columns} 
	    	dataSource={data} 
	    	bordered
	    	onRowClick={this.handleRowClick}
	    	onChange={this.handleChange} 
	    />
    </div>
  }
}
