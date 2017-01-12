import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import Item from './Item';

class SubMenu extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	divOpen: false,
    };
  }

	handleClick = path => (e) => {
		e.stopPropagation();
		// if (e.target && e.target.matches('div.top-menu-title')) {
			this.setState({divOpen: !this.state.divOpen});
		// }
	}

	render() {
		const { path, text, children, level } = this.props;
		const divClass = classNames(level ? "submenu" : "topmenu", {"submenu-open" : this.state.divOpen});//{divOpen : !this.state.divOpen}
		return (
			<li className={divClass} onClick={this.handleClick(path)} data-path={path}>
				<div className="submenu-title" style={{"paddingLeft": level*24+24}}>{text}</div>
				<ul>
					{ children }
				</ul>
			</li>
		)
	}
}

export default SubMenu;
