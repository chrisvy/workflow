import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, deselect } from '../redux/actions';
import Level1 from './Level1';

class MyMenuItem extends Component {
	constructor(props) {
    super(props);
  }

	handleClickLi = (index) => (e) => {
		if (e.target && e.target.matches('li.item')) {
			this.props.dispatch(select(index));
		}
	}

	render() {
		const handleClickLi = this.handleClickLi;
		let menus = this.props.menus;
		let keyIndex = 0;
		let topMenu = Object.keys(menus);//['工作流开发', '回收站', '其他']
		return (
			<div>
				<ul className="rootMenu">
				{
					topMenu.map(function(item, index) {
						return <Level1 key={'level1'+index} className="level1" topItem={item} level1Items={menus[item]} handleClickLi={handleClickLi} path={"l" + index}></Level1>
					})
				}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { menus } = state;
	return { menus } ;
}

export default connect(mapStateToProps)(MyMenuItem);
