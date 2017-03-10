import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import SubMenu from './SubMenu';
import { menuTab, select, deselect, parsedMenu, changeMenu, contextItem } from '../actions/actions';
import _ from 'lodash';
import { Radio } from 'yo-component';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class MyMenuItem extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	children: null,
    	trash: null,
      menuTab: "0-0"
    }
  }

	// folder
	// data.data: {name: 'xxx', id: 'xxx', cildren: []}

	parseMenus = (flag, results, menus, path, level, onContextMenu) => {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			const nowPath = path + index;
			// if (typeof obj === "string") {
			if (obj.type !== 0) {
				flag ? (results["works"][nowPath] = obj.name) : (results["trash"][nowPath] = obj.name);//{ name: obj, isWork: true }
				return <Item key={nowPath} type={flag} path={nowPath} text={obj.name} level={level} id={obj.id} handleContextMenu={onContextMenu}/>
			} else {
				// const keys = Object.keys(obj);//keys ['工作流开发']
				// return keys.map((key, subIndex) => {//key '工作流开发'
					// const subArr = obj[key];
					const subArr = obj.children;
					flag ? (results["files"][nowPath] = obj.name) : (results["trash"][nowPath] = obj.name);//{ name: key, isWork: false, kidsNum: subArr.length }
					const children = this.parseMenus(flag, results, subArr, nowPath + '-', level+1, onContextMenu);
					return <SubMenu key={nowPath} text={obj.name} path={nowPath} level={level} children={children} id={obj.id} handleContextMenu={onContextMenu}/>
				// });
			}
		});
	}

	menusAddDir = (aimPath, newObject, results, menus, path, level, onContextMenu) => {
		return menus.map((obj, index) => {
			const nowPath = path + index;
			if (obj.type !== 0) {
				results["works"][nowPath] = obj.name;
				return <Item key={nowPath} path={nowPath} text={obj.name} level={level} id={obj.id} handleContextMenu={onContextMenu}/>
			} else {
				let subArr = obj.children;
				results["files"][nowPath] = obj.name;
				let children = this.menusAddDir(aimPath, newObject, results, subArr, nowPath + '-', level+1, onContextMenu);
				if (nowPath === aimPath) {
					const childrenNum = children.length;
					const appendPath = nowPath + '-' + childrenNum;
					children.push(<SubMenu key={appendPath} path={appendPath} text={newObject.name} level={level+1} id={newObject.id} handleContextMenu={onContextMenu}/>);
					results["files"][appendPath] = newObject.name;
					subArr.push(newObject);//TODO 因为新添加的没有type、id等信息，所以需要后端返回数据重新渲染
				}
				return <SubMenu key={nowPath} text={obj.name} path={nowPath} level={level} id={obj.id} children={children} handleContextMenu={onContextMenu}/>
			}
		});
	}

	menusAddWork = (aimPath, newObject, results, menus, path, level, onContextMenu) => {
		return menus.map((obj, index) => {
			const nowPath = path + index;
			if (obj.type !== 0) {
				results["works"][nowPath] = obj.name;
				return <Item key={nowPath} path={nowPath} text={obj.name} level={level} id={obj.id} handleContextMenu={onContextMenu}/>
			} else {
				let subArr = obj.children;
				results["files"][nowPath] = obj.name;
				let children = this.menusAddWork(aimPath, newObject, results, subArr, nowPath + '-', level+1, onContextMenu);
				if (nowPath === aimPath) {
					const childrenNum = children.length;
					const appendPath = nowPath + '-' + childrenNum;
					children.push(<Item key={appendPath} path={appendPath} text={newObject.name} level={level+1} id={newObject.id} handleContextMenu={onContextMenu}/>);
					results["works"][appendPath] = newObject.name;
					subArr.push(newObject);//直接修改menus
				}
				return <SubMenu key={nowPath} text={obj.name} path={nowPath} level={level} id={obj.id} children={children} handleContextMenu={onContextMenu}/>
			}
		});
	}

	menusDeleteWork = (aimPath, newObject, results, menus, path, level) => {//results
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
						let children = this.menusDeleteWork(aimPath, newObject, results, subArr, nowPath + '-', level+1);
						const lastFlag = aimPath.lastIndexOf('-');
						const parPath = aimPath.slice(0, lastFlag);
						const theIndex = aimPath.slice(lastFlag+1);
						if (nowPath === parPath) {
							delete subArr[theIndex];
						} else if (nowPath === '1') {
							const addItem = '1-' + children.length;
							console.log('1', addItem, newObject);
							children.push(<Item key={addItem} path={addItem} text={newObject} level={1} />);
							subArr.push(newObject);
						}
						return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
					});
			}
		});
	}

	menusBackWork = (oriPath, newObject, openPath, results, menus, path, level) => {//results
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
						let children = this.menusBackWork(oriPath, newObject, openPath, results, subArr, nowPath + '-', level+1);
						if (nowPath === openPath) {
							const addItem = openPath + '-' + children.length;
							children.push(<Item key={addItem} path={addItem} text={newObject} level={level+1} />);
							results["works"][addItem] = newObject;
							subArr.push(newObject);
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
		const { menus, menuTab, parsedRes, onContextMenu} = this.props;
		const menuTabIndex = menuTab.split("-")[1];
		let results = _.cloneDeep(parsedRes);
		results[menuTab] = {"works":{}, "files": {}, "trash": {}};
		const children = this.parseMenus(true, results[menuTab], menus[menuTabIndex]["data"], menuTab+'-', 0, onContextMenu);
		const trash = this.parseMenus(false, results[menuTab], menus[menuTabIndex]["trash"], '1-'+menuTab+'-', 1, onContextMenu);
		this.setState({
			children,
			trash
		});
		this.props.dispatch(parsedMenu(results));
		// console.log('1', results);
	}

	componentWillReceiveProps = (nextProps) => {//componentDidUpdate is wrong
		const { menus, menuTab, parsedRes, contextInfo, contextOperate, newObject, openPath, contextButton, onContextMenu } = nextProps;
		console.log("menuTab", menuTab);
		const menuTabIndex = menuTab.split("-")[1];
		let results = _.cloneDeep(parsedRes);
		results[menuTab] = {"works":{}, "files": {}, "trash": {}};
		let children, trash;
		if (contextButton) {
			if (!Array.isArray(newObject)) {//模态框中输入的新工作流名称
				if (contextOperate === "addDir") {
					children = this.menusAddDir(contextInfo.path, newObject, results[menuTab], menus[menuTabIndex]["data"], menuTab+'-', 0, onContextMenu);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
					this.props.dispatch(contextItem(""));
				} else if (contextOperate === "addWork") {
					children = this.menusAddWork(openPath, newObject, results[menuTab], menus[menuTabIndex]["data"], menuTab+'-', 0, onContextMenu);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
					this.props.dispatch(contextItem(""));
				} else if (contextOperate === "cpWork") {
					children = this.menusAddWork(openPath, newObject, results[menuTab], menus[menuTab]["data"], '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
					this.props.dispatch(contextItem(""));
				}
			// this.props.dispatch(changeMenu());
			} else if (newObject[0] === "delete") {
				if (contextOperate === "mvWork") {
					children = this.menusDeleteWork(contextInfo.path, contextInfo.text, results[menuTab], menus[menuTab]["data"], '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
					this.props.dispatch(contextItem(""));
				}
			} else if (newObject[0] === "back") {
				if (contextOperate === "back") {
					children = this.menusBackWork(contextInfo.path, contextInfo.text, openPath, results[menuTab], menus[menuTab]["data"], '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
					this.props.dispatch(contextItem(""));
				}
			} else if (newObject[0] === "remove") {
				if (contextOperate === "rmWork") {
					children = this.menusRemoveWork(contextInfo.path, results[menuTab], menus[menuTab]["data"], '', 0);
					this.setState({children});
					this.props.dispatch(parsedMenu(results));
					this.props.dispatch(contextItem(""));
				}
			}
		} else if (menuTab !== this.props.menuTab) {
			children = this.parseMenus(true, results[menuTab], menus[menuTabIndex]["data"], menuTab + '-', 0, onContextMenu);
			trash = this.parseMenus(false, results[menuTab], menus[menuTabIndex]["trash"], '1-'+menuTab+'-', 1, onContextMenu);
			this.setState({
				children,
				trash
			});
			this.props.dispatch(parsedMenu(results));
			this.props.dispatch(contextItem(""));
		}
	}

	onChange = (e) => {
    // console.log(`radio checked:${e.target.value}`);
    this.props.dispatch(menuTab(e.target.value));
  }

  handleClick = (path, id, text) => e => {
		e.stopPropagation();
		this.props.dispatch(select(path, id, text));//text打开对应的Tab
	}

	handleContextMenu = (path, id, text, contextType) => (e) => {
		console.log('handleContextMenu ', path, id, text, contextType);
		this.props.onContextMenu(e);
		this.props.dispatch(contextItem(path, id, text, contextType));
		this.props.dispatch(select(path, id));
	}

	render() {
		const { menus, menuTab, contextInfo, contextOperate, onContextMenu } = this.props;
		return (
			<div>
				<RadioGroup onChange={this.onChange} defaultValue={this.state.menuTab}>
	        <RadioButton value={"0-0"} data-path={"0-0"} spClassName="contextflag" onContextMenu={this.handleContextMenu("0-0", 0, "工作流空间", "Tabs")}>工作流空间</RadioButton>
	        <RadioButton value={"0-1"} data-path={"0-1"} spClassName="contextflag" onContextMenu={this.handleContextMenu("0-1", 0, "单任务空间", "Tabs")}>单任务空间</RadioButton>
	      </RadioGroup>
				<div className="mymenu menu-box contextflag" onContextMenu={this.handleContextMenu("0", 0, "", "TopFile")}>
	        <ul className="root-menu">
	          {
							this.state.children
						}
						<SubMenu key={"1-"+menuTab} text="回收站" path={"1-"+menuTab} level={0} children={this.state.trash} id={-1} handleContextMenu={onContextMenu}/>
	        </ul>
	      </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { menusReducer: { menus, menuTab, parsedRes, contextInfo, contextOperate, newObject, contextButton }, cascaderReducer: { openPath } } = state;
	return { menus, menuTab, parsedRes, contextInfo, contextOperate, newObject, openPath, contextButton };
}

export default connect(mapStateToProps)(MyMenuItem);
