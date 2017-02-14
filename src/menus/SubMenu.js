import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import Item from './Item';
import { open, select, contextItem } from '../actions/actions';

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

	handleContextMenu = (path, text, contextType) => (e) => {
		console.log('handleContextMenu ', path, contextType);
		this.props.dispatch(contextItem(path, text, contextType));
		this.props.dispatch(select(path));
	}

	render() {
		const { path, text, children, level, openStatus, contextInfo ,itemSelected, selectKey } = this.props;
		const titleClass = classNames('submenu-title', {'work-space': path === '0'}, {'cycle-space': path === '1'}, {'submenu-selected': (itemSelected && selectKey === path)});
		const divClass = classNames(level ? "submenu" : "topmenu", {"submenu-open" : openStatus[path]});
		return (
			<li className={divClass} onClick={this.handleClick(path)} data-path={path} >
				<div className={titleClass} style={{"paddingLeft": level*24+24}} onContextMenu={this.handleContextMenu(path, text, "subFile")}>{text}</div>
				<ul>
					{ children }
				</ul>
			</li>
		)
	}
}

const mapStateToProps = state => {
	const { menuReducer: { openStatus, itemSelected, selectKey }, menuConReducer: { contextInfo } } = state;
	return { openStatus, contextInfo, itemSelected, selectKey };
}

export default connect(mapStateToProps)(SubMenu);
