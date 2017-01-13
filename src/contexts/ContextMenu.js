import React, { Component } from 'react';
var classNames = require('classnames');
import './ContextMenu.css';

class ContextMenu extends Component {
			
	render() {
		const { menuShow, x, y, contextInfo } = this.props;
		const contextShowClass = classNames("context-menu", {"context-menu-show": menuShow && (contextInfo !== null) });
		const style = {left: x, top: y};
		let contextType;
		if (contextInfo) {
			
			path = contextInfo.path;
			if (path === "0") {
				contextType = "TopFile";
			} else if (path === "1") {
				contextType = "";
			} else if (path[0] === "1") {
				contextType = "trash";
			} else {
				contextType = contextInfo.contextType;
			}
		}
		return (
			<div className={contextShowClass} style={style}>
				<div className={classNames("context-item-group", {"context-item-group-open": contextType === "TopFile"})} ref='myTopPopup'>
			    <div className="context-item">新建目录</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "subFile"})} ref='myTopPopup'>
			    <div className="context-item">新建目录</div>
			    <div className="context-item">新建工作流</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "workflow"})} ref='myTopPopup'>
			    <div className="context-item">复制工作流</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "trash"})} ref='mySubPopup'>
			    <div className="context-item">还原到</div>
			    <div className="context-item">彻底删除</div>
			  </div>
			</div>
		)
	}
}

export default ContextMenu;
