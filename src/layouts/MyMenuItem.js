import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, deselect } from '../redux/actions';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';
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
		let allMenu = this.props.menus;
		let keyIndex = 0;
		let topMenu = Object.keys(allMenu);//['工作流开发', '回收站', '其他']
		return (
			<div>
				<ul className="rootMenu">
				{
					topMenu.map(function(item, index) {
						return <Level1 key={'level1'+index} className="level1" topItem={item} level1Items={allMenu[item]} handleClickLi={handleClickLi} path={index}></Level1>
					})
				}
				</ul>
			</div>
		)
	}
}

export default connect()(MyMenuItem);
