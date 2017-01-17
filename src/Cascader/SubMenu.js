import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
// import { open, contextItem } from '../actions/actions';

class SubMenu extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	divOpen: false,
    };
  }

	handleDoubleClick = path => (e) => {
		e.stopPropagation();
		// if (e.target && e.target.matches('div.top-menu-title')) {
			this.setState({divOpen: !this.state.divOpen});
		// }
		// this.props.dispatch(open(path));
	}

	// handleContextMenu = path => (e) => {
	// 	this.props.dispatch(contextItem(path, "subFile"));
	// }

	render() {
		const { path, text, children, level, openStatus } = this.props;
		const divClass = classNames(level ? "submenu" : "topmenu", {"submenu-open" : this.state.divOpen});//openStatus[path]}
		return (
			<li className={divClass} onDoubleClick={this.handleDoubleClick(path)} data-path={path} >
				<div className="submenu-title" style={{"paddingLeft": level*24+24}} >{text}</div>
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