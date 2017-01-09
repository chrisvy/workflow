import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';

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
		const { subMenu, subItems, handleClickLi, path, itemSelected, selectKey } = this.props;
		let divClass = classNames("menu-item", {"menu-item-open" : this.state.divOpen});
		let keyIndex = 0;
		return (
			<div>
				<li className={divClass} onClick={this.handleClick} data-path={path}>
					<div className="menu-item-title">{ subMenu }</div>
					<ul>
					{
						subItems.map(function(item, index) {
							const pathData = path + '-' + index;
							return <li key={'item'+index} className={classNames("item", {"item-selected" : (itemSelected && selectKey === pathData) })} onClick={handleClickLi(pathData)} data-path={pathData}>{item}</li>
						})
					}
					</ul>
				</li>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { itemSelected, selectKey } = state;
	return { itemSelected, selectKey };
}

export default connect(mapStateToProps)(Level2);
