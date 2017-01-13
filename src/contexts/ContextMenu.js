import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import './ContextMenu.css';
import { contextOperate } from '../redux/actions';

class ContextMenu extends Component {
	
	constructor(props) {
    super(props);
  }

  handleClick = (operate) => {
  	this.props.dispatch(contextOperate(operate));
  }

	render() {
		const { menuShow, x, y, contextInfo } = this.props;
		const contextShowClass = classNames("context-menu", {"context-menu-show": menuShow && (contextInfo !== null) });
		const style = {left: x, top: y};
		let contextType;
		if (contextInfo) {
			const path = contextInfo.path;
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
				<div className={classNames("context-item-group", {"context-item-group-open": contextType === "TopFile"})} >
			    <div className="context-item" onClick={e => this.handleClick("addFile")}>新建目录</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "subFile"})} >
			    <div className="context-item" onClick={e => this.handleClick("addFile")}>新建目录</div>
			    <div className="context-item" onClick={e => this.handleClick("addWorkflow")}>新建工作流</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "workflow"})} >
			    <div className="context-item" onClick={e => this.handleClick("cpWorkflow")}>复制工作流</div>
			    <div className="context-item" onClick={e => this.handleClick("mvWorkflow")}>移动工作流</div>
			  </div>
			  <div className={classNames("context-item-group", {"context-item-group-open": contextType === "trash"})} ref='mySubPopup'>
			    <div className="context-item" onClick={e => this.handleClick("back")}>还原到</div>
			    <div className="context-item" onClick={e => this.handleClick("remove")}>彻底删除</div>
			  </div>
			</div>
		)
	}
}

export default connect()(ContextMenu);
