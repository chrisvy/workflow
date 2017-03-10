import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'yo-component/dist/antd.css';
import '../styles/common.css';
import '../styles/layout.css';
import '../styles/leftNav.css';
// import MyMenuItem from './MyMenuItem';
import Search from './Search';
import MyTabs from '../tabs/index';
import Contexts from '../contexts/index';
import ContextMenu from '../contexts/ContextMenu';
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
    const { contextMenuShow: { x, y, menuShow } } = this.props;

    return (
      <div>
        <div className="header-nav">
          <span className="header-nav-title">智能调度引擎</span>
          <ul className="header-nav-ul">
            <li className="header-nav-li">总览</li>
            <li className="header-nav-li header-nav-li-selected">产品服务 &or;</li>
            <li className="header-nav-li">文档与帮助</li>
          </ul>
        </div>
        <div className="content-box">
            <div className="left-nav">
              <Search />
              <Contexts />
            </div>
            <div className="right-context">
              <MyTabs />
              <div className="main-content">
                {this.props.children}
              </div>
            </div>
          <ContextMenu menuShow={menuShow} x={x} y={y} />
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

const mapStateToProps = state => {
  const { menusReducer: { contextMenuShow } } = state;
  return { contextMenuShow };
}

export default connect(mapStateToProps)(MyMenu);