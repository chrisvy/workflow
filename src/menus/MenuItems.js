import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, deselect } from '../redux/actions';
import Item from './Item';
import SubMenu from './SubMenu';
import '../styles/menustyle.css';

class MyMenuItem extends Component {
	constructor(props) {
    super(props);
  }

	// handleClickLi = (index) => (e) => {
	// 	if (e.target && e.target.matches('li.item')) {
	// 		this.props.dispatch(select(index));
	// 	}
	// }

	// menus: [
 //    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': []}]},
 //    {'回收站': [{'d1':['d1.1','d1.2']}]},
 //  ]

	parseMenus = (parsedRes, menus, path) => {
		menus.map((obj, index) => {//obj {'工作流开发': []}
			if (typeof obj === "string") {
				parsedRes[path + index] = { name: obj, isWork: true };
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					parsedRes[path + index] = { name: key, isWork: false, kidsNum: subArr.length };
					parseMenus(parsedRes, subArr, path + index + '-');
				});
			}
		});
	}

	render() {
		const menus = this.props.menus;
		let parsedRes = {};
		// parseMenus(parsedRes, menus, '');
		return (
			<div>
				{
					menus.map((obj, index) => {
						const upPath = ""+index;
						if (typeof obj === "string") {
							return <Item path={upPath} text={obj} />
						} else {
							const keys = Object.keys(obj);//keys ['工作流开发']
							return keys.map((key, subIndex) => {//key '工作流开发'
								console.log('1', key, subIndex);
								const subArr = obj[key];
								parsedRes[upPath] = { name: key, isWork: false, kidsNum: subArr.length };
								let children = subArr.map((subMenuObj, inIndex) => {
									const subText = Object.keys(subMenuObj)[0];
									const subPath = upPath+"-"+inIndex;
									console.log('2', subPath, subText);
									return <SubMenu key={subPath} text={subText} path={subPath} />
								});
								console.log('3', children);
								return <SubMenu key={upPath} text={key} path={upPath} children={children} />
							});
						}
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { menus } = state;
	return { menus } ;
}

export default connect(mapStateToProps)(MyMenuItem);
