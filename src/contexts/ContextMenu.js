import React, { Component } from 'react';
var classNames = require('classnames');
import './ContextMenu.css';

class ContextMenu extends Component {
			
	render() {
		const { menuShow, x, y } = this.props;
		const contextShowClass = classNames("context-menu", {"context-menu-show": menuShow });
		const style = {left: x, top: y};
		return (
			<div className={contextShowClass} style={style}>
			  <div className="context-item-group" ref='myTopPopup'>
			    <div className="context-item">新建目录</div>
			    <div className="context-item">新建工作流</div>
			  </div>
			  <div className="context-item-group" ref='mySubPopup'>
			    <div className="context-item">还原到</div>
			    <div className="context-item">彻底删除</div>
			  </div>
			</div>
		)
	}
}

export default ContextMenu;
