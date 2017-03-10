import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import Item from './Item';
import { open, select, contextItem } from '../actions/actions';
var imgDir0 = require("../img/dir0.png");
var imgDir1 = require("../img/dir1.png");
var imgTrash = require("../img/trash.png");

class SubMenu extends Component {
	constructor(props) {
    super(props);

    // this.state = {
    // 	divOpen: false,
    // };
  }

	handleClick = path => (e) => {
		e.stopPropagation();
		// if (e.target && e.target.matches('div.top-menu-title')) {
			// this.setState({divOpen: !this.state.divOpen});
		// }
		this.props.dispatch(open(path));
	}

	handleContextMenu = (path, id, text, contextType) => (e) => {
		e.stopPropagation();
		console.log('handleContextMenu ', path, id, contextType);
		this.props.handleContextMenu(e);
		this.props.dispatch(contextItem(path, id, text, contextType));
		this.props.dispatch(select(path, id));
	}

	render() {
		const { path, text, id, children, level, openStatus, contextInfo ,itemSelected, selectKey } = this.props;
		const titleClass = classNames("contextflag", 'submenu-title', {'work-space': path === '0'}, {'cycle-space': path === '1'}, {'submenu-selected': (itemSelected && selectKey === path)});
		const divClass = classNames("contextflag", level ? "submenu" : "topmenu", {"submenu-open" : openStatus[path]});
		const img = path[0] === "0" ? (openStatus[path] ? imgDir1 : imgDir0) : imgTrash;
		return (
			<li className={divClass} data-id={id} onClick={this.handleClick(path)} data-path={path} >
				<div className={titleClass} style={{"paddingLeft": level*24+24}} onContextMenu={this.handleContextMenu(path, id, text, "subFile")}><img className="leftnav-img" src={img} alt=""/>{text}</div>
				<ul>
					{ children }
				</ul>
			</li>
		)
	}
}

const mapStateToProps = state => {
	const { menusReducer: { openStatus, itemSelected, selectKey, contextInfo } } = state;
	return { openStatus, contextInfo, itemSelected, selectKey };
}

export default connect(mapStateToProps)(SubMenu);
