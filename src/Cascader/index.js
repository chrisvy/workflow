import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Cascader from './Cascader';
import { select, contextItem } from '../actions/actions';

class MyCascader extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	visible: false
    }
  }

	handleFocus = e => {
		e.stopPropagation();
		this.setState({
			visible: true
		});
	}

	// handleContextMenu = (path, contextType) => (e) => {
	// 	this.props.dispatch(contextItem(path, contextType));
	// }

	render() {
		const { path, text, itemSelected, selectKey, level } = this.props;
		const itemClass = classNames("menu-item", {"menu-item-selected" : (itemSelected && selectKey === path) });
		const contextType = "workflow";
		return (
			<div>
				<input type="text" placeholder="选择所属目录" className="ant-input ant-cascader-input" ref="input" readOnly autoComplete="off" onFocus={this.handleFocus}/>
	      <Cascader visible={this.state.visible}/>
			</div>
    )
	}
}

const mapStateToProps = state => {
	const { menuReducer: { itemSelected, selectKey } } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(MyCascader);