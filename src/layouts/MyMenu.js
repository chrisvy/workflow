import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import '../styles/leftNav.css';
// import MyMenuItem from './MyMenuItem';
import Search from './Search';
import Contexts from '../contexts/index';
import AddDirModal from '../modals/AddDirModal';
import AddWorkModal from '../modals/AddWorkModal';

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
        <div className="ant-col-xs-24 ant-col-sm-4 ant-col-md-4 ant-col-lg-4">
          <div className="left-nav">
            <Search />
            <Contexts />
          </div>
        </div>
        <div className="ant-col-xs-24 ant-col-sm-20 ant-col-md-20 ant-col-lg-20">
          <div className="right-context">
            {this.props.children}
          </div>
        </div>
        <AddDirModal />
        <AddWorkModal />
      </div>
    );
  }

}

export default connect()(MyMenu);
