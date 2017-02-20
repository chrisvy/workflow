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
		this.props.topHandleClick(path, text);
		this.props.dispatch(cascaderMenu(path));
	}

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