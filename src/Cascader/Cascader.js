import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './Item';
import { select, deselect, parsedMenu, changeMenu } from '../actions/actions';
// import _ from 'lodash';
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
				// results["works"][nowPath] = obj;//{ name: obj, isWork: true }
				return <Item key={nowPath} path={nowPath} text={obj} level={level} />
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					// results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
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
				// results["works"][nowPath] = obj;//{ name: obj, isWork: true }
				return <Item key={nowPath} path={nowPath} text={obj} level={level} />
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					// results["files"][nowPath] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
					let children = this.menusAddDir(aimPath, contextObjectName, results, subArr, nowPath + '-', level+1);
					// if (nowPath === aimPath) {
					// 	const childrenNum = children.length;
					// 	// console.log("nowPath", nowPath, childrenNum);
					// 	const appendPath = nowPath + '-' + childrenNum;
					// 	children.push(<SubMenu key={appendPath} text={contextObjectName} path={appendPath} level={level+1} />);
					// 	// results["files"][appendPath] = contextObjectName;
					// 	obj[key].push({[contextObjectName]: []});
					// }
					return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children}/>
				});
			}
		});
	}

	componentDidMount = () => {
		const { menus } = this.props;
		const tmpMenus = [menus[0]];
		let results = {"works":{}, "files": {}};
		const children = this.parseMenus(results, tmpMenus, '', 0);
		this.setState({children});
		// this.props.dispatch(parsedMenu(results));
		// console.log('1', results);
	}

	componentWillReceiveProps = (nextProps) => {//componentDidUpdate is wrong
		// // console.log(prevProps, this.props);
		// const { menus, contextInfo, contextOperate, contextObjectName } = nextProps;
		// // console.log("componentWillReceiveProps", menus);
		// let results = {"works":{}, "files": {}};
		// let children;
		// if (contextObjectName && contextOperate === "addDir") {
		// 	children = this.menusAddDir(contextInfo.path, contextObjectName, results, menus, '', 0);
		// 	this.setState({children});
		// 	// this.props.dispatch(parsedMenu(results));
		// }
		// // this.props.dispatch(changeMenu());
	}

	render() {
		const { menus, contextInfo, contextOperate, visible } = this.props;
		const cascaderClass = classNames("my-cascader-menus", {"my-cascader-menus-show": visible});
		return (
			<ul className={cascaderClass}>
				{
					this.state.children
				}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	const { menuReducer: { menus }, menuConReducer: { contextInfo, contextOperate, contextObjectName } } = state;
	return { menus, contextInfo, contextOperate, contextObjectName };
}

export default connect(mapStateToProps)(MyMenuItem);
