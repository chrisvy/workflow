import React, { Component } from 'react';
var classNames = require('classnames');
import Item from './Item';

class SubMenu extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	divOpen : false
    };
  }

	handleClick = (e) => {
		if (e.target && e.target.matches('div.top-menu-title')) {
			this.setState({divOpen: !this.state.divOpen});
		}
	}

	render() {
		const { path, text, children } = this.props;
		const divClass = classNames("sub-menu", {"sub-menu-open" : this.state.divOpen});//{divOpen : !this.state.divOpen}
		return (
			<div>
				<li className={divClass} onClick={this.handleClick} data-path={path}>
					<div className="top-menu-title">{text}</div>
					<ul>
						{ children }
					</ul>
				</li>
			</div>
		)
	}
}

export default SubMenu;
