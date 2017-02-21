import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { contextOperate, changeTab, closeTab } from '../actions/actions';

class Titles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: [],
      hideList: [],
      wholeRender: true
    };
  }

  handleAdd = (operate) => {
    this.props.dispatch(contextOperate(operate));
  }

  handleChangeTab = (index, item) => {
    this.props.dispatch(changeTab(index, item));
  }

  handleClose = (index) => (e) => {
    e.stopPropagation();
    this.props.dispatch(closeTab(index));
  }

  updateScope = (flag, prevSelectedTabs, selectedTabs) => {
    if (flag && prevSelectedTabs.length === selectedTabs.length) {
      const same = prevSelectedTabs.every((tab, index) => tab == selectedTabs[index]);
      if (same) {
        console.log("4 return");
        return
      }
    }
    console.log("2 not return");
    const container = document.getElementById("mytabs-container");
    const titlesBox = document.getElementById("mytabs-titles");
    const titlesObj = titlesBox.getElementsByClassName("my-tabs-tab");
    const titlesArr = Array.from(titlesObj);
    const float = document.getElementById("mytabs-float");
    const button = document.getElementById("mytabs-button");
    let widthLeft = container.clientWidth - float.clientWidth - button.clientWidth;
    // console.log("test", float.clientWidth, button.clientWidth);
    let showList = [], hideList = [];
    titlesArr.reverse().map((title, index) => {
      const theWidth = title.clientWidth;
      const theId = title.getAttribute("data-id");
      // console.log("the width", theWidth);
      widthLeft -= theWidth;
      if (widthLeft < 0) {
        hideList.unshift(theId);
      } else {
        showList.unshift(theId);
      }
    });
    this.setState({
      showList,
      hideList,
      wholeRender: false
    });
    // console.log("width", showList, hideList);
  }

  componentDidMount = () => {
    console.log("1 mount");
    this.updateScope();
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    this.setState({
      wholeRender: true
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log("3 update");
    this.updateScope(true, prevProps.selectedTabs, this.props.selectedTabs);
  }

  render = () => {
    const { selectedTabs, tmpIndex, activeIndex, parsedRes, notSaveState } = this.props;
    const handleChangeTab = this.handleChangeTab;
    const handleClose = this.handleClose;
    console.log('lists', this.state.showList, this.state.hideList);
    return (
      <div className="ant-tabs-nav-container" id="mytabs-container">
        <div className="ant-tabs-nav" id="mytabs-titles">
         {
          this.state.wholeRender ? selectedTabs.map((item, index) => {
              const title = parsedRes["works"][item];
              // console.log("title", title);
                return <div className={classNames("ant-tabs-tab", "my-tabs-tab", {"ant-tabs-tab-active": index===activeIndex})} key={item} data-id={item} onClick={() => handleChangeTab(index, item)}>
                  {notSaveState && notSaveState[item] && <span>*</span>}
                  <span className="my-tabs-tab-title">{title}</span>
                  <i className="anticon anticon-close" onClick={handleClose(index)}></i>
                </div>
              })
          : this.state.showList.map((item, index) => {
              const title = parsedRes["works"][item];
              // console.log("title", title);
                return <div className={classNames("ant-tabs-tab", "my-tabs-tab", {"ant-tabs-tab-active": index===activeIndex})} key={item} data-id={item} onClick={() => handleChangeTab(index, item)}>
                  {notSaveState && notSaveState[item] && <span>*</span>}
                  <span className="my-tabs-tab-title">{title}</span>
                  <i className="anticon anticon-close" onClick={handleClose(index)}></i>
                </div>
            })
         }
         {
            <div className="add-tabs-button" id="mytabs-button" onClick={() => this.handleAdd("addWork")}>
              <span>+ 新建</span>
            </div>
         }
         </div>
          <div className="add-tabs-overflow" id="mytabs-float">
            <span  className="add-tabs-overflow-text">隐藏</span>
            <ul className="add-tabs-addon-lists">
              {
                this.state.wholeRender ? null : this.state.hideList.map(item => {
                  const title = parsedRes["works"][item];
                  return <li key={item} className="add-tabs-addon-item">{title}</li>
                })
              }
            </ul>
          </div>
      </div>
      )
  }
}
const mapStateToProps = (state) => {
  const { menuReducer: { tmpIndex, activeIndex, selectedTabs, parsedRes } } = state;
  return { tmpIndex, activeIndex, selectedTabs, parsedRes };
}

export default connect(mapStateToProps)(Titles);
