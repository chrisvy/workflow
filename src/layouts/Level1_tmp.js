import React, { Component } from 'react';
var classNames = require('classnames');
import Level2 from './Level2';

class Level1 extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	divOpen : false
    };
  }

	handleClick = (e) => {
		e.stopPropagation();
		// if (e.target && e.target.matches('div.top-menu-title')) {
			this.setState({divOpen: !this.state.divOpen});
		// }
	}

	genRender(level1Items, topItem, path) {//level1Items [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': []}]
		console.log('1', level1Items, topItem, path);
		let divClass = classNames("top-menu", {"top-menu-open" : this.state.divOpen});//{divOpen : !this.state.divOpen}
		return (
			<div>
				<li className={divClass} onClick={::this.handleClick} data-path={path}>
					<div className="top-menu-title">{topItem}</div>
					<ul>
					{
						// tmpGenRender(level1Items, path)
						level1Items.length ? level1Items.map((item, index) => {//item {'4G业务': ['text_workflow', 'text_phone']}
							return level1Items.length ? level1Items.slice(0,1).map(() => {
								console.log('2', item, index);
								const pathData = path + "l" + index;
								if (typeof item === "string") {
									return <Level2 key={pathData + 'l' + index} item={item} path={pathData}></Level2>
								} else {
									const subKey = Object.keys(item)[0];
									const subValue = item[subKey];//若数组中包含对象或字符串
									return genRender(subValue, subKey, pathData);
								}
							}) : ''
						}) : ''
					}
					</ul>
				</li>
			</div>
		)
	}

	// tmpGenRender(level1Items, path) {
	// 	for (let index=0, n=level1Items.length; index<n; index++ ) {
	// 						let level1Items = level1Items[index];
	// 						console.log('2', item, index);
	// 						const pathData = path + "l" + index;
	// 						if (typeof item === "string") {
	// 							return <Level2 key={pathData + 'l' + index} item={item} path={pathData}></Level2>
	// 						} else {
	// 							const subKey = Object.keys(item)[0];
	// 							const subValue = item[subKey];//若数组中包含对象或字符串
	// 							return genRender(subValue, subKey, pathData);
	// 						}
	// 					}
	// }

	render() {
		let { level1Items, topItem, path } = this.props;//level1Items [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': []}]
		// let topMenuKey = Object.keys(level1Items);//['工作流开发', '回收站', '其他']
		return this.genRender(level1Items, topItem, path);
	}
}

export default Level1;
