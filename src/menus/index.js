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
						const appendPath = nowPath + '-' + childrenNum;
						children.push(<SubMenu key={appendPath} text={contextObjectName} path={appendPath} level={level+1} />);
						results["files"][appendPath] = contextObjectName;
						obj[key].push({[contextObjectName]: []});//直接修改menus
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
						obj[key].push(contextObjectName);//直接修改menus
					}
					return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
				});
			}
		});
	}

	menusDeleteWork = (aimPath, contextObjectName, results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				if (nowPath === aimPath) {
					return null;
				} else {
					results["works"][nowPath] = obj;//{ name: obj, isWork: true }
					return <Item key={nowPath} path={nowPath} text={obj} level={level} />
				}
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
						const subArr = obj[key];
						results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
						let children = this.menusDeleteWork(aimPath, contextObjectName, results, subArr, nowPath + '-', level+1);
						const lastFlag = aimPath.lastIndexOf('-');
						const parPath = aimPath.slice(0, lastFlag);
						const theIndex = aimPath.slice(lastFlag+1);
						if (nowPath === parPath) {
							delete subArr[theIndex];
						} else if (nowPath === '1') {
							const addItem = '1-' + children.length;
							console.log('1', addItem, contextObjectName);
							children.push(<Item key={addItem} path={addItem} text={contextObjectName} level={1} />);
							subArr.push(contextObjectName);
						}
						return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
					});
			}
		});
	}

	menusBackWork = (oriPath, contextObjectName, openPath, results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				if (nowPath === oriPath) {
					const lastFlag = oriPath.lastIndexOf('-');
					const theIndex = oriPath.slice(lastFlag+1);
					delete menus[theIndex];
					return null;
				} else {
					results["works"][nowPath] = obj;//{ name: obj, isWork: true }
					return <Item key={nowPath} path={nowPath} text={obj} level={level} />
				}
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']，没有'回收站'
				return keys.map((key, subIndex) => {//key '工作流开发'
						const subArr = obj[key];
						results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
						let children = this.menusBackWork(oriPath, contextObjectName, openPath, results, subArr, nowPath + '-', level+1);
						if (nowPath === openPath) {
							const addItem = openPath + '-' + children.length;
							children.push(<Item key={addItem} path={addItem} text={contextObjectName} level={level+1} />);
							results["works"][addItem] = contextObjectName;
							subArr.push(contextObjectName);
						}
						return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
					});
			}
		});
	}

	menusRemoveWork = (oriPath, results, menus, path, level) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			if (typeof obj === "string") {
				if (nowPath === oriPath) {
					const lastFlag = oriPath.lastIndexOf('-');
					const theIndex = oriPath.slice(lastFlag+1);
					delete menus[theIndex];
					return null;
				} else {
					results["works"][nowPath] = obj;//{ name: obj, isWork: true }
					return <Item key={nowPath} path={nowPath} text={obj} level={level} />
				}
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
						const subArr = obj[key];
						results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
						let children = this.menusRemoveWork(oriPath, results, subArr, nowPath + '-', level+1);
						return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
					});
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
		const { menus, contextInfo, contextOperate, contextObjectName, openPath, contextButton } = nextProps;
		console.log('test', contextOperate, contextInfo, openPath);
		let results = {"works":{}, "files": {}};
		let children;
		if (contextButton) {
			if (typeof contextObjectName === "string") {//模态框中输入的新工作流名称
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
					children = this.menusDeleteWork(contextInfo.path, contextInfo.text, results, menus, '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
				}
			} else if (contextObjectName[0] === "back") {
				if (contextOperate === "back") {
					children = this.menusBackWork(contextInfo.path, contextInfo.text, openPath, results, menus, '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
				}
			} else if (contextObjectName[0] === "remove") {
				if (contextOperate === "rmWork") {
					children = this.menusRemoveWork(contextInfo.path, results, menus, '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
				}
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
	const { menuReducer: { menus }, menuConReducer: { contextInfo, contextOperate, contextObjectName, contextButton }, cascaderReducer: { openPath } } = state;
	return { menus, contextInfo, contextOperate, contextObjectName, openPath, contextButton };
}

export default connect(mapStateToProps)(MyMenuItem);
