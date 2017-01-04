import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';
import Level2 from './Level2';

class Level1 extends Component {
	render() {
		let { level1Items, topItem } = this.props;
		console.log(level1Items);
		let keyIndex = 0;
		let topMenuKey = Object.keys(level1Items);//['工作流开发', '回收站', '其他']
		return (
			<div>
				<li className="topMenu">
					<div  className="topMenu-title">{topItem}</div>
					<ul>
					{
						topMenuKey.map(function(item, index) {
							return <Level2 key={'in' + index} subMenu={item} subItems={level1Items[item]}></Level2>
						})
					}
					</ul>
				</li>
			</div>
		)
	}
}

export default Level1;
