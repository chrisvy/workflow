import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { contextOperate } from '../actions/actions';

class Titles extends Component {
  constructor(props) {
    super(props);

  }

  handleAdd = (operate) => {
    this.props.dispatch(contextOperate(operate));
  }

  componentDidMount = () => {
    const container = document.getElementById("mytabs-container");
    const titles = document.getElementById("mytabs-titles");
    const float = document.getElementById("mytabs-float");
    console.log("width", container.clientWidth, titles.clientWidth, float.clientWidth);
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    const container = document.getElementById("mytabs-container");
    const titles = document.getElementById("mytabs-titles");
    console.log("width", container);
  }

  render = () => {
    const { panes, showList, activeKey, saveState, handleChangeTab, handleClose } = this.props;
    return (
      <div className="ant-tabs-nav-container" id="mytabs-container">
        <div className="ant-tabs-nav" id="mytabs-titles">
         {
            panes.map(item => {
              const { id, title } = item;
              if (showList[id]) {
                return <div className={classNames("ant-tabs-tab", "my-tabs-tab", {"ant-tabs-tab-active": id===activeKey})} key={id} onClick={() => handleChangeTab(id)}>
                  {saveState && saveState[id] && <span>*</span>}
                  <span className="my-tabs-tab-title">{title}</span>
                  <i className="anticon anticon-close" onClick={handleClose(id)}></i>
                </div>
              } else {
                return null
              }
          })
         }
         {
            <div className="add-tabs-button" onClick={() => this.handleAdd("addWork")}>
              <span>+ 新建</span>
            </div>
         }
         </div>
          <div className="add-tabs-overflow" id="mytabs-float">
            <span>隐藏</span>
          </div>
      </div>
      )
  }
}

export default connect()(Titles);
