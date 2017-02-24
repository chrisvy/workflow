import React, { Component } from 'react';
import classNames from 'classnames';
// import MyTable from './MyTable';
// import MyRechart from './MyRechart';
import LinkChart from './LinkChart';

export default class Contents extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
  	
    return <div className="table-box">
    	<LinkChart />
    </div>
  }
}
