import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import { contextOperate, contextClose } from '../actions/actions';

class ContextMenu extends Component {
	
	constructor(props) {
    super(props);
  }

  handleClick = (operate) => {
  	this.props.dispatch(contextOperate(operate));
  }

	render() {
		const { contextInfo, contextButton, contextMenuShow: { menuShow, x, y }, closeTab } = this.props;
		// console.log(contextButton);
		const contextShowClass = classNames("context-menu", {"context-menu-show": menuShow });
		const style = {left: x, top: y};
		let contextType;
		if (contextInfo) {
			const path = contextInfo.path;
			if (contextInfo.contextType === "closeTabs") {
				contextType = "closeTabs";
			} if (path.split("-").length === 2 && path[0] === "0") {
				contextType = "TopFile";//Tabs
			} else if (path === "1") {
				contextType = "";
			} else if (path[0] === "1") {
				contextType = "trash";
			} else if (closeTab) {
				contextType = closeTab.contextType;
			} else {
				contextType = contextInfo.contextType;
			}
		}
		return (
			<div className={contextShowClass} style={style}>
				<div className={classNames("context-item-group", {"context-item-group-open": contextType === "TopFile"})} >
			    <div className="context-item" onClick={e => this.handleClick("addDir")}>新建目录</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "subFile"})} >
			    <div className="context-item" onClick={e => this.handleClick("addDir")}>新建目录</div>
			    <div className="context-item" onClick={e => this.handleClick("addWork")}>新建工作流</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "workflow"})} >
			    <div className="context-item" onClick={e => this.handleClick("cpWork")}>复制工作流</div>
			    <div className="context-item" onClick={e => this.handleClick("mvWork")}>删除工作流</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "trash"})} ref='mySubPopup'>
			    <div className="context-item" onClick={e => this.handleClick("back")}>还原到</div>
			    <div className="context-item" onClick={e => this.handleClick("rmWork")}>彻底删除</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "closeTabs"})} ref='mySubPopup'>
			    <div className="context-item" onClick={e => this.handleClick("closeOthers")}>关闭其他</div>
			    <div className="context-item" onClick={e => this.handleClick("closeAll")}>关闭所有</div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { menusReducer: { contextInfo, contextButton, contextMenuShow, closeTab } } = state;
	return { contextInfo, contextButton, contextMenuShow, closeTab };
}

export default connect(mapStateToProps)(ContextMenu);
