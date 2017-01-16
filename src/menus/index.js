import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, deselect } from '../redux/actions';
import Item from './Item';
import SubMenu from './SubMenu';
import { parsedMenu, changeMenu } from '../redux/actions';
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

	menusAddFile = (aimPath, contextObjectName, results, menus, path, level) => {//results
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
					let children = this.menusAddFile(aimPath, contextObjectName, results, subArr, nowPath + '-', level+1);
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

	componentDidMount = () => {
		const { menus } = this.props;
		let results = {"works":{}, "files": {}};
		const children = this.parseMenus(results, menus, '', 0);
		this.setState({children});
		// this.props.dispatch(parsedMenu(results));
		// console.log('1', results);
	}

	componentWillReceiveProps = (nextProps) => {//componentDidUpdate is wrong
		// console.log(prevProps, this.props);
		const { menus, contextInfo, contextOperate, contextObjectName } = nextProps;
		// console.log("componentWillReceiveProps", menus);
		let results = {"works":{}, "files": {}};
		let children;
		if (contextObjectName && contextOperate === "addFile") {
			children = this.menusAddFile(contextInfo.path, contextObjectName, results, menus, '', 0);
			this.setState({children});
		}
		// this.props.dispatch(changeMenu());
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
	const { menus, contextInfo, contextOperate, contextObjectName } = state;
	return { menus, contextInfo, contextOperate, contextObjectName };
}

export default connect(mapStateToProps)(MyMenuItem);
