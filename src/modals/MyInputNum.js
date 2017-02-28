import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio, Checkbox, InputNumber } from 'yo-component';
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
import { cronTab, cronRadio, cronAddon } from '../actions/cronmakerAction';
import './modals.css';

class MyInputNum extends Component {

	constructor(props) {
    super(props);

    this.state = {
      value: 1
    }
  }

	render() {

		const  { min, max } = this.props;
		return (
			<div className="ant-input-number">
				<div className="ant-input-number-handler-wrap">
					<span unselectable="unselectable" className="ant-input-number-handler ant-input-number-handler-up ">
						<span unselectable="unselectable" className="ant-input-number-handler-up-inner"></span>
					</span>
					<span unselectable="unselectable" className="ant-input-number-handler ant-input-number-handler-down ant-input-number-handler-down-disabled">
						<span unselectable="unselectable" className="ant-input-number-handler-down-inner"></span>
					</span>
				</div>
				<div className="ant-input-number-input-wrap">
					<input min={min} max={max} className="ant-input-number-input" autocomplete="off" value={this.state.value} />
				</div>
			</div>
		)
	}

}

export default MyInputNum;