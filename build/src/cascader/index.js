import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './Item';
import { select, deselect, parsedMenu, changeMenu, cascaderMenu } from '../actions/actions';
// import _ from 'lodash';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import DisplayForSelectCascader from '../utils/DisplayForSelectCascader';
import '../styles/cascader.css';

@DisplayForSelectCascader
class MyCascader extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	children: null,
    	value: '',
    	lastLevel: 0,
    	openPath: "0-0-0"
    }
  }

	parseMenus = (menus, path, level, openPath) => {
		return menus.map((obj, index) => {
			const nowPath = path + index;
			if (obj.type !== 0) {
				return <Item key={nowPath} path={nowPath} text={obj.name} level={level} id={obj.id}/>
			} else {
					const subArr = obj.children;
					const children = this.parseMenus(subArr, nowPath + '-', level+1, openPath);
					return <SubMenu key={nowPath} text={obj.name} path={nowPath} level={level} children={children} topHandleClick={this.topHandleClick} id={obj.id}/>
			}
		});
	}

	componentDidMount = () => {
		const { menus, menuTab } = this.props;
		const menuTabIndex = menuTab.split("-")[1];
		const children = this.parseMenus(menus[menuTabIndex]["data"], menuTab+'-', 0, this.state.openPath);
		this.setState({children});
	}

	topHandleClick = (path, text) => {//闪屏
		const oldText = this.state.value.split("/");
		const lastLevel = oldText.length;
		const pathArr = path.split("-");
		const currLevel = pathArr.length-2;//现在的path比之前多了一层
		if (currLevel === 1) {
			this.setState({
				value: text,
				openPath: path
			})
		} else if (lastLevel >= currLevel) {
			let currText = oldText[0];
			for (let index=1; index<currLevel-2; index++) {//path比原来多了一层
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
		this.props.dispatch(cascaderMenu(path));
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
		const flagClass = classNames({"ant-select-open": wrapDisplayProps.showFlag });
		return (
			<div className={flagClass}>
				<input type="text" placeholder="选择所属目录" className="ant-input ant-cascader-input" ref="input" value={this.state.value} readOnly autoComplete="off" onClick={this.handleClick}/>
				<span className="ant-select-arrow" ><b></b></span>
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
	const { menusReducer: { menus, menuTab, contextInfo, contextOperate }, cascaderReducer } = state;
	return { menus, menuTab, contextInfo, contextOperate, cascaderReducer };
}

export default connect(mapStateToProps)(MyCascader);
