import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select } from '../redux/actions';

class Level2 extends Component {
	constructor(props) {
    super(props);
  }

	handleClick = (path) => {
		// if (e.target && e.target.matches('div.menu-item-title')) {
			this.props.dispatch(select(path));
		// }
	}

	render() {
		const { path, text, itemSelected, selectKey } = this.props;
		const itemClass = classNames("item", {"item-selected" : (itemSelected && selectKey === path) });
		return <li className={itemClass} onClick={this.handleClick(path)} data-path={path}>{item}</li>
	}
}

const mapStateToProps = state => {
	const { itemSelected, selectKey } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(Level2);
