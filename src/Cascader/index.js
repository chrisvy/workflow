import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './Item';
import { select, deselect, parsedMenu, changeMenu } from '../actions/actions';
// import _ from 'lodash';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import DisplayContainer from '../utils/DisplayContainer';
import './cascader.css';

@DisplayContainer
class MyCascader extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	children: null,
    	value: '',
    	lastLevel: 0,
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
					return <SubMenu key={nowPath} text={key} path={nowPath} level={level} children={children} topHandleClick={this.topHandleClick} />
				});
			}
		});
	}

	componentDidMount = () => {
		const { menus } = this.props;
		const tmpMenus = Object.values(menus[0])[0];
		// const tmpMenus = [menus[0]];
		let results = {"works":{}, "files": {}};
		const children = this.parseMenus(results, tmpMenus, '0-', 0);
		this.setState({children});
		// this.props.dispatch(parsedMenu(results));
		// console.log('1', results);
	}

	topHandleClick = (path, text) => {//闪屏
		const oldText = this.state.value.split("/");
		const lastLevel = oldText.length;
		const currLevel = path.split("-").length;
		if (currLevel === 1) {
			this.setState({
				value: text,
				openPath: path
			})
		} else if (lastLevel >= currLevel) {
			let currText = oldText[0];
			for (let index=1; index<currLevel-1; index++) {
				currText += "/" + oldText[index];
			}
			this.setState({
				value: currText + '/' + text,
				openPath: path
			})
		} else {
			this.setState({
				value: this.state.value + '/' + text,
				openPath: path
			})
		}
	}

	handleClick = e => {
		if (!this.props.wrapDisplayProps.showFlag) {
			this.props.wrapDisplayProps.show();
		} else {
			this.props.wrapDisplayProps.innerHide();
		}
	}

	render() {
		const { menus, contextInfo, contextOperate, wrapDisplayProps } = this.props;
		const cascaderClass = classNames("my-cascader-menus", {"my-cascader-menus-show": wrapDisplayProps.showFlag });
		return (
			<div>
				<input type="text" placeholder="选择所属目录" className="ant-input ant-cascader-input" ref="input" value={this.state.value} readOnly autoComplete="off" onClick={this.handleClick}/>
	      <ul className={cascaderClass}>
					{
						this.state.children
					}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { menuReducer: { menus }, menuConReducer: { contextInfo, contextOperate, contextObjectName }, cascaderReducer } = state;
	return { menus, contextInfo, contextOperate, contextObjectName, cascaderReducer };
}

export default connect(mapStateToProps)(MyCascader);
