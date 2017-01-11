import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { open } from '../redux/actions';

class Level2 extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	divOpen: false
    };
  }

	handleClick = (e) => {
		if (e.target && e.target.matches('div.menu-item-title')) {
			this.setState({divOpen : !this.state.divOpen});
		}
	}

	render() {
		const { subMenu, subItems, handleClickLi, path, itemSelected, selectKey, menuStatus } = this.props;
		let divClass = classNames("menu-item", {"menu-item-open" : this.state.divOpen});
		let keyIndex = 0;
		return (
			<div>
				<li className={divClass} onClick={this.handleClick} data-path={path}>
					<div className="menu-item-title">{ subMenu }</div>
					<ul>
					{
						subItems.map((item, index) => {
							const pathData = path + "l" + index;
							// console.log('l3', menuStatus, pathData);
							const itemClass = classNames("item", {"item-selected" : (itemSelected && selectKey === pathData) });
							return <li key={'item'+index} className={itemClass} onClick={handleClickLi(pathData)} data-path={pathData}>{item}</li>
						})
					}
					</ul>
				</li>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { itemSelected, selectKey, menuStatus } = state;
	return { itemSelected, selectKey, menuStatus };
}

export default connect(mapStateToProps)(Level2);
