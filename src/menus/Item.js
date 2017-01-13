import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select, contextItem } from '../redux/actions';

class Level2 extends Component {
	constructor(props) {
    super(props);
  }

	handleClick = (path) => e => {
		e.stopPropagation();
		this.props.dispatch(select(path));
	}

	handleContextMenu = (path, contextType) => (e) => {
		console.log(path);
		this.props.dispatch(contextItem(path, contextType));
	}

	render() {
		const { path, text, itemSelected, selectKey, level } = this.props;
		const itemClass = classNames("menu-item", {"menu-item-selected" : (itemSelected && selectKey === path) });
		const contextType = "workflow";
		return <li className={itemClass} onClick={this.handleClick(path)} data-path={path} style={{"paddingLeft": level*24+24}} onContextMenu={this.handleContextMenu(path, contextType)}>{text}</li>
	}
}

const mapStateToProps = state => {
	const { itemSelected, selectKey } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(Level2);
