import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, deselect } from '../redux/actions';
import Item from './Item';
import SubMenu from './SubMenu';
import { parsedMenu } from '../redux/actions';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class MyMenuItem extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	children: null
    }
  }
	
	handleClick(e, data) {
	  console.log(data);
	}

	// menus: [
 //    {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': []}]},
 //    {'回收站': [{'d1':['d1.1','d1.2']}]},
 //  ]

	parseMenus(results, menus, path, level) {//results
		return menus.map((obj, index) => {//obj {'工作流开发': []}
			if (typeof obj === "string") {
				results["works"][path + index] = obj;//{ name: obj, isWork: true }
				return <Item key={path + index} path={path + index} text={obj} level={level} />
			} else {
				const keys = Object.keys(obj);//keys ['工作流开发']
				return keys.map((key, subIndex) => {//key '工作流开发'
					const subArr = obj[key];
					results["files"][path + index] = key;//{ name: key, isWork: false, kidsNum: subArr.length }
					const children = this.parseMenus(results, subArr, path + index + '-', level+1);
					return <SubMenu key={path + index} text={key} path={path + index} level={level} children={children}/>
				});
			}
		});
	}

	componentDidMount() {
		const { menus } = this.props;
		let results = {"works":{}, "files": {}};
		const children = this.parseMenus(results, menus, '', 0);
		this.setState({children});
		this.props.dispatch(parsedMenu(results));
		// console.log('1', results);
	}

	render() {
		const menus = this.props.menus;
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
	const { menus } = state;
	return { menus };
}

export default connect(mapStateToProps)(MyMenuItem);
