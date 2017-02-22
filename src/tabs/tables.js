import React, { Component } from 'react';
import classNames from 'classnames';
import { Table, Icon } from 'antd';
import './table.css';

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
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

  render() {
  	let { sortedInfo } = this.state;
		sortedInfo = sortedInfo || {};
		const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
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
