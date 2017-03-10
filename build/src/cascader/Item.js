import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select, contextItem } from '../actions/actions';

class Item extends Component {
	constructor(props) {
    super(props);
  }
  
	render() {
		const { path, text, itemSelected, selectKey, level } = this.props;
		const itemClass = classNames("menu-item", {"menu-item-selected" : (itemSelected && selectKey === path) });
		const contextType = "workflow";
		return <li /* className={itemClass} onClick={this.handleClick(path)} */ data-path={path} style={{"paddingLeft": level*24+24, "display": "none"}} /* onContextMenu={this.handleContextMenu(path, contextType)} */ >{text}</li>
	}
}

const mapStateToProps = state => {
	const { menusReducer: { itemSelected, selectKey } } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(Item);
