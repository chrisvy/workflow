import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select, contextItem } from '../actions/actions';
var imgWorkflow0 = require("../img/workflow0.png");
var imgWorkflow1 = require("../img/workflow1.png");
var imgTask0 = require("../img/task0.png");
var imgTask1 = require("../img/task1.png");

class Level2 extends Component {
	constructor(props) {
    super(props);
  }

	handleClick = (path, id, text) => e => {
		e.stopPropagation();
		this.props.dispatch(select(path, id, text));//text打开对应的Tab
	}

	handleContextMenu = (path, id, text, contextType) => (e) => {
		e.stopPropagation();
		this.props.handleContextMenu(e);
		console.log('handleContextMenu ', path, id, text, contextType);
		this.props.dispatch(contextItem(path, id, text, contextType));
		this.props.dispatch(select(path));
	}

	render() {
		const { path, text, type, id, itemSelected, selectKey, level } = this.props;
		const itemClass = classNames("contextflag", "menu-item", {"menu-item-selected" : (itemSelected && selectKey === path) });
		const contextType = "workflow";
		const pathArr = path.split("-");
		const img = pathArr[0] === "0" ? (pathArr[1] === "1" ? imgTask1 : imgWorkflow1) : (pathArr[2] === "1" ? imgTask0 : imgWorkflow0);
		return <li className={itemClass} data-id={id} onClick={this.handleClick(path, id, text)} data-path={path} style={{"paddingLeft": level*24+24}} onContextMenu={this.handleContextMenu(path, id, text, contextType)} ><img className="leftnav-img" src={img} alt=""/>{text}</li>
	}
}

const mapStateToProps = state => {
	const { menusReducer: { itemSelected, selectKey } } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(Level2);
