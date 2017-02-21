import React, { Component } from 'react';
import classNames from 'classnames';
import Titles from './Titles';
import Contents from './Contents';
import './tabs.css';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      showList: {'0': true, '1': true, '2': true},
      notSaveState: {'0': true, '1': false},
      showMore: false
    };
  }

  showMore = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  }

  render() {
     return <div>
     	<Titles showList={this.state.showList} notSaveState={this.state.notSaveState} showMore={this.showMore}/>
     	<Contents/ >
     </div>
  }
}
