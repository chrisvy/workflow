import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import '../styles/leftNav.css';
// import MyMenuItem from './MyMenuItem';
import Search from './Search';
import Contexts from '../contexts/index';
import AddDirModal from '../modals/AddDirModal';
import AddWorkModal from '../modals/AddWorkModal';
import CpWorkModal from '../modals/CpWorkModal';
import MvWorkModal from '../modals/MvWorkModal';
import RmWorkModal from '../modals/RmWorkModal';
import BackModal from '../modals/BackModal';

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
      <div>
        <div className="ant-row header-nav">
          <span className="header-nav-title">智能调度引擎</span>
          <ul className="header-nav-ul">
            <li className="header-nav-li">总览</li>
            <li className="header-nav-li header-nav-li-selected">产品服务 &or;</li>
            <li className="header-nav-li">文档与帮助</li>
          </ul>
        </div>
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
          <CpWorkModal />
          <MvWorkModal />
          <RmWorkModal />
          <BackModal />
        </div>
      </div>
    );
  }

}

export default connect()(MyMenu);
