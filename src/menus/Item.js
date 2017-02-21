import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select, dblSelect, contextItem } from '../actions/actions';

class Level2 extends Component {
	constructor(props) {
    super(props);

  }

	handleClick = (path, text) => e => {
		e.stopPropagation();
		if (this.timeout) {
			window.clearTimeout(this.timeout);
		}
		this.timeout = window.setTimeout(() => this.props.dispatch(select(path, text)), 300);//text打开对应的Tab
	}

	handleDblClick = path => (e) => {
		e.stopPropagation();
		if (this.timeout) {
			window.clearTimeout(this.timeout);
		}
		this.props.dispatch(dblSelect(path));
	}

	handleContextMenu = (path, text, contextType) => (e) => {
		console.log('handleContextMenu ', path, text, contextType);
		this.props.dispatch(contextItem(path, text, contextType));
		this.props.dispatch(select(path));
	}

	render() {
		const { path, text, itemSelected, selectKey, level } = this.props;
		const itemClass = classNames("menu-item", {"menu-item-selected" : (itemSelected && selectKey === path) });
		const contextType = "workflow";
		return <li className={itemClass} onClick={this.handleClick(path, text)} onDoubleClick={this.handleDblClick(path)} data-path={path} style={{"paddingLeft": level*24+24}} onContextMenu={this.handleContextMenu(path, text, contextType)} >{text}</li>
	}
}

const mapStateToProps = state => {
	const { menuReducer: { itemSelected, selectKey } } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(Level2);
