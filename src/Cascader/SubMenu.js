import React, { Component } from 'react';
import { connect } from 'react-redux';
var classNames = require('classnames');
import { cascaderMenu } from '../actions/actions';

class SubMenu extends Component {
	constructor(props) {
    super(props);

    // this.state = {
    // 	divOpen: false,
    // };
  }

	handleClick = (path, text) => e => {
		// if (e.target && e.target.matches('div.top-menu-title')) {
			// this.setState({divOpen: !this.state.divOpen});
		// }
		this.props.topHandleClick(path, text);
		this.props.dispatch(cascaderMenu(path));
	}

	// componentDidMount = () => {
	// 	const { path, text } = this.props;
	// 	this.refs.title.addEventListener('click', e => {
	// 		e.stopPropagation();
	// 		e.preventDefault();
	// 		// this.setState({divOpen: !this.state.divOpen});
	// 		this.props.dispatch(cascaderText(path, text));
	// 	});
	// }

	// componentWillUnmount = () => {
	// 	this.refs.title.removeEventListener('click');
	// }

	render() {
		const { path, text, children, level, openStatus, topHandleClick, openPath } = this.props;
		const divClass = classNames("submenu", {"submenu-open" : openPath.indexOf(path)===0});//this.state.divOpen
		return (
			<li className={divClass} data-path={path} >
				<div className="submenu-title my-cascader-submenu-title" style={{"paddingLeft": level*24+24}} ref="title" onClick={this.handleClick(path, text)} >{text}</div>
				<ul>
					{ children }
				</ul>
			</li>
		)
	}
}

const mapStateToProps = state => {
	const { menuReducer: { openStatus }, cascaderReducer: { openPath } } = state;
	return { openStatus, openPath };
}

export default connect(mapStateToProps)(SubMenu);