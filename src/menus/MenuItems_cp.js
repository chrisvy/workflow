import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, deselect } from '../redux/actions';
import Item from './Item';
import SubMenu from './SubMenu';

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

	parseMenus(parsedRes, menus, path) {
		menus.map((obj, index) => {//obj {'工作流开发': []}
			if (typeof obj === "string") {
				parsedRes[path + index] = { name: obj, isWork: true };
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					parsedRes[path + index] = { name: key, isWork: false, kidsNum: subArr.length };
					this.parseMenus(parsedRes, subArr, path + index + '-');
				});
			}
		});
	}

	componentDidMount() {
		const { menus, parsedRes } = this.props;
		this.parseMenus(parsedRes, menus, '');
		console.log('1', parsedRes);
	}

	genChildren(subPath) {
		const info = this.props.parsedRes[subPath];
		const kidsNum = info.kidsNum;
		let childrenNode = [];
		for (let index=0; index<kidsNum; index++) {
			childrenNode.push();
		}
	}

	render() {
		const menus = this.props.menus;
		return (
			<div>
				{
					menus.map((obj, index) => {
						const upPath = ""+index;
						if (typeof obj === "string") {
							return <Item key={upPath} path={upPath} text={obj} />
						} else {
							const keys = Object.keys(obj);//keys ['工作流开发']
							return keys.map((key, subIndex) => {//key '工作流开发'
								// console.log('1', key, subIndex);
								const subArr = obj[key];
								// parsedRes[upPath] = { name: key, isWork: false, kidsNum: subArr.length };
								let children = subArr.map((subMenuObj, inIndex) => {//subMenuObj {'4G业务': ['text_workflow', 'text_phone']}
									const subPath = upPath+"-"+inIndex;
									if (typeof subMenuObj === "string") {
										return  <Item key={subPath} path={subPath} text={subMenuObj} />
									} else {
										const subText = Object.keys(subMenuObj)[0];
										// console.log('2', subPath, subText);
										return <SubMenu key={subPath} text={subText} path={subPath} />
									}
								});
								// console.log('3', children);
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
	const { menus, parsedRes } = state;
	return { menus, parsedRes };
}

export default connect(mapStateToProps)(MyMenuItem);
