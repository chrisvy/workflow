import React, { Component } from 'react';
import classNames from 'classnames';
import TabContainer from './TabContainer';
import '../styles/tabs.css';
import { AutoComplete } from 'yo-component';
import InputCascader from '../cascader/inputCascader';
import Yoprogress from '../progress/Yoprogress';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      showList: {'0': true, '1': true, '2': true},
      notSaveState: {'0': true, '1': false},
      showMore: false,
      dataSource: ['1','2','3'],//todelete for autocomplete
      autoValue: '',
      changeFlag: true
    };
  }

  showMore = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  }

  handleSelect = (value) => {
    console.log('onSelect', value);
    const { autoValue } = this.state;
    const lastIndex = autoValue.lastIndexOf("/");
    let newAutoValue;
    if (lastIndex !== -1) {
      newAutoValue = autoValue.slice(0,lastIndex) + '/' + value + '/';
    } else {
      newAutoValue = value + '/';
    }
    this.setState({
      dataSource: ['4','5','6'],
      autoValue: newAutoValue,
      changeFlag: false
    });
  }

  handleChange = (value) => {
    console.log('onChange', value);
    if (this.state.changeFlag) {
      console.log(1);
      this.setState({
        dataSource: !value ? ['1','2','3'] : [
          value,
          value + value,
          value + value + value,
        ],
        autoValue: value
      });
    } else {
      console.log(2);
      this.setState({
        changeFlag: true,
        autoValue: value
      });
    }
  }

  render() {
     return <TabContainer showList={this.state.showList} notSaveState={this.state.notSaveState} showMore={this.showMore}/>
      {/*
        <InputCascader />
        <AutoComplete
          dataSource={this.state.dataSource}
          style={{ width: 200 }}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
          value={this.state.autoValue}
        />
        <Yoprogress percent={30} />
      */}
  }
}
