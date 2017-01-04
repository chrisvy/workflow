import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';

class Level2 extends Component {
	render() {
		let { subMenu, subItems } = this.props;
		let keyIndex = 0;
		return (
			<div>
				<li className="menuItem">
					<div  className="menuItem-title">{ subMenu }</div>
					<ul>
					{
						subItems.map(function(item, index) {
							return <li key={'item'+index} className='items' key={'in' + index}>{item}</li>
						})
					}
					</ul>
				</li>
			</div>
		)
	}
}

export default Level2;
