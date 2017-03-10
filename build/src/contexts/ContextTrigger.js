import React, { Component } from 'react';
var classNames = require('classnames');
import MouseContainer from '../utils/MouseContainer';

@MouseContainer
class ContextTrigger extends Component {
	
	constructor(props) {
		super(props);
	}

	// componentDidMount = () => {
	// 	this.refs.menu.addEventListener('contextmenu', this.props.onContextMenu);
	// }

 //  componentWillUnmount = () => {
 //    this.refs.menu.removeEventListener('contextmenu', this.props.onContextMenu);
 //  }

	// componentDidUpdate = () => {
	// 	this.refs.menu.addEventListener('contextmenu', this.props.onContextMenu);
	// }

	render() {
		const { menuShow, x, y, children, wrapMouseProps, onContextMenu } = this.props;
		return (
			<div className="context-wrapper" {...wrapMouseProps}>
				{ children }
			</div>
		)
	}
}

export default ContextTrigger;