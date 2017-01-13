import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/leftNav.css';
// import MyMenuItem from './MyMenuItem';
import Search from './Search';
import Contexts from '../contexts/index';

class MyMenu extends Component {
  
	constructor(props) {
		super(props);

    this.state = {
      x: 0,
      y: 0
    }
	}

	render() {

    return (
      <div className="ant-row">
        <div className="ant-col-xs-24 ant-col-sm-6 ant-col-md-6 ant-col-lg-5">
          <div className="left-nav">
            <Search />
            <Contexts />
          </div>
        </div>
        <div className="ant-col-xs-24 ant-col-sm-18 ant-col-md-18 ant-col-lg-19">
          <div className="right-context">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

export default MyMenu;
