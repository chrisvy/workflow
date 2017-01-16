import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import Item from './Item';
import { open, contextItem } from '../actions/actions';

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

	handleContextMenu = path => (e) => {
		this.props.dispatch(contextItem(path, "subFile"));
	}

	render() {
		const { path, text, children, level, openStatus } = this.props;
		const divClass = classNames(level ? "submenu" : "topmenu", {"submenu-open" : openStatus[path]});//{divOpen : !this.state.divOpen}
		return (
			<li className={divClass} onClick={this.handleClick(path)} data-path={path} >
				<div className="submenu-title" style={{"paddingLeft": level*24+24}} onContextMenu={this.handleContextMenu(path, "subFile")}>{text}</div>
				<ul>
					{ children }
				</ul>
			</li>
		)
	}
}

const mapStateToProps = state => {
	const { menuReducer: { openStatus } } = state;
	return { openStatus };
}

export default connect(mapStateToProps)(SubMenu);
