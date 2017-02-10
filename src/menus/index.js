import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import SubMenu from './SubMenu';
import { select, deselect, parsedMenu, changeMenu } from '../actions/actions';
import _ from 'lodash';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class MyMenuItem extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	children: null
    }
  }

	// menus: [
 //    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': []}]},
 //    {'回收站': [{'d1':['d1.1','d1.2']}]},
 //  ]

	parseMenus = (results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				results["works"][nowPath] = obj;//{ name: obj, isWork: true }
				return <Item key={nowPath} path={nowPath} text={obj} level={level} />
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
					const children = this.parseMenus(results, subArr, nowPath + '-', level+1);
					return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
				});
			}
		});
	}

	menusAddDir = (aimPath, contextObjectName, results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				results["works"][nowPath] = obj;//{ name: obj, isWork: true }
				return <Item key={nowPath} path={nowPath} text={obj} level={level} />
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
					let children = this.menusAddDir(aimPath, contextObjectName, results, subArr, nowPath + '-', level+1);
					if (nowPath === aimPath) {
						const childrenNum = children.length;
						// console.log("nowPath", nowPath, childrenNum);
						const appendPath = nowPath + '-' + childrenNum;
						children.push(<SubMenu key={appendPath} text={contextObjectName} path={appendPath} level={level+1} />);
						results["files"][appendPath] = contextObjectName;
						obj[key].push({[contextObjectName]: []});
					}
					return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
				});
			}
		});
	}

	menusAddWork = (aimPath, contextObjectName, results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				results["works"][nowPath] = obj;//{ name: obj, isWork: true }
				return <Item key={nowPath} path={nowPath} text={obj} level={level} />
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
					let children = this.menusAddWork(aimPath, contextObjectName, results, subArr, nowPath + '-', level+1);
					if (nowPath === aimPath) {
						const childrenNum = children.length;
						// console.log("nowPath", nowPath, childrenNum);
						const appendPath = nowPath + '-' + childrenNum;
						children.push(<Item key={appendPath} text={contextObjectName} path={appendPath} level={level+1} />);
						results["works"][appendPath] = contextObjectName;
						obj[key].push({[contextObjectName]: []});
					}
					return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
				});
			}
		});
	}

	menusDeleteWork = (aimPath, tmpText, results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				if (nowPath === aimPath) {
					tmpText[0] = obj;
					return null;
				} else {
					results["works"][nowPath] = obj;//{ name: obj, isWork: true }
					return <Item key={nowPath} path={nowPath} text={obj} level={level} />
				}
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				let tmpChi = keys.map((key, subIndex) => {//key '工作流开发'
						const subArr = obj[key];
						results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
						let children = this.menusDeleteWork(aimPath, tmpText, results, subArr, nowPath + '-', level+1);
						return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
					});
				if (nowPath === '1') {
					const addItem = '1-' + tmpChi.length;
					console.log('1', addItem, tmpText[0]);
					tmpChi.push(<Item key={addItem} path={addItem} text={tmpText[0]} level={1} />);
				}
				return tmpChi;
			}
		});
	}

	componentDidMount = () => {
		const { menus } = this.props;
		let results = {"works":{}, "files": {}};
		const children = this.parseMenus(results, menus, '', 0);
		this.setState({children});
		this.props.dispatch(parsedMenu(results));
		// console.log('1', results);
	}

	componentWillReceiveProps = (nextProps) => {//componentDidUpdate is wrong
		const { menus, contextInfo, contextOperate, contextObjectName, openPath } = nextProps;
		console.log('test', contextObjectName, contextOperate);
		console.log("componentWillReceiveProps", contextObjectName, contextOperate, openPath);
		let results = {"works":{}, "files": {}};
		let children;
		if (typeof contextObjectName === "string") {
			if (contextOperate === "addDir") {
				children = this.menusAddDir(contextInfo.path, contextObjectName, results, menus, '', 0);
				this.setState({children});
				this.props.dispatch(parsedMenu(results));
			} else if (contextOperate === "addWork") {
				children = this.menusAddWork(openPath, contextObjectName, results, menus, '', 0);
				this.setState({children});
				this.props.dispatch(parsedMenu(results));
			} else if (contextOperate === "cpWork") {
				children = this.menusAddWork(openPath, contextObjectName, results, menus, '', 0);
				this.setState({children});
				this.props.dispatch(parsedMenu(results));
			}
		// this.props.dispatch(changeMenu());
		} else if (contextObjectName[0] === "delete") {
			if (contextOperate === "mvWork") {
				let tmpText = [];//记录删掉的工作流名称
				children = this.menusDeleteWork(contextInfo.path, tmpText, results, menus, '', 0);
				this.setState({children});
				this.props.dispatch(parsedMenu(results));
			}
		}
	}

	render() {
		const { menus, contextInfo, contextOperate } = this.props;
		return (
			<ul>
				{
					this.state.children
				}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	const { menuReducer: { menus }, menuConReducer: { contextInfo, contextOperate, contextObjectName }, cascaderReducer: { openPath } } = state;
	return { menus, contextInfo, contextOperate, contextObjectName, openPath };
}

export default connect(mapStateToProps)(MyMenuItem);
