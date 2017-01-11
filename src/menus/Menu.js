import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';
import MenuItems from './MenuItems';
import Search from '../layouts/Search';

class MyMenu extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		
    return (
      <div className="ant-row">
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5">
          <Search />
          <div className="mymenu">
          	<MenuItems/>
          </div>
          <div className="mypopup">
            <div className="myTopPopup" ref='myTopPopup'>
              <div>新建目录</div>
              <div>新建工作流</div>
            </div>
            <div className="mySubPopup" ref='mySubPopup'>
              <div>还原到</div>
              <div>彻底删除</div>
            </div>
          </div>
        </div>
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-18 ant-col-lg-19">
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default MyMenu;
