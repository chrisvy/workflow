import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';
import MyMenuItem from './MyMenuItem';
import Search from './Search';

class MyMenu extends Component {
	static defaultProps = {
		menus: {
      '工作流开发': {'4G业务': ['text_workflow', 'text_phone'], '宽带业务': ['21','22'], '信令': []},
      '回收站': {'d1':['d1.1','d1.2']},
      '其他': {}
    }
	};

	constructor(props) {
		super(props);

		const currProps = this.props;
		this.state = {
			current: '1',
			...currProps
		}
	}

	handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

	render() {
		
    return (
      <div className="ant-row">
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5">
          <Search />
          <div className="mymenu">
          	<MyMenuItem menus={this.state.menus}/>
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
