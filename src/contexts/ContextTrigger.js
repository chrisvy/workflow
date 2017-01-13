import React, { Component } from 'react';
var classNames = require('classnames');
import './ContextMenu.css';
import MouseContainer from '../utils/MouseContainer';

@MouseContainer
class ContextTrigger extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { menuShow, x, y, children, wrapMouseProps, onContextMenu } = this.props;
		// console.log('name', wrapMouseProps, this.props, onContextMenu);
		// const contextShowClass = classNames("context-menu", {"context-menu-show": menuShow });
		// const style = {left: x, top: y};
		return (
			<div className="context-wrapper" {...wrapMouseProps} onContextMenu={onContextMenu}>
				{ children }
			</div>
		)
	}
}

export default ContextTrigger;