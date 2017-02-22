import React, { Component } from 'react';
import classNames from 'classnames';
import MyTable from './tables';
import MyRechart from './recharts';

export default class Contents extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
  	
    return <div className="table-box">
    	<MyTable />
    	<MyRechart />
    </div>
  }
}
