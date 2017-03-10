import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleContainer from './TitleContainer';
import { contextOperate, changeTab, closeTab, rearrangeTab, select } from '../actions/actions';

class TabContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: [],
      showListId: [],
      hideList: [],
      hideListId: [],
      wholeRender: true,
      showMore: false,
      reRender: false
    };
  }

  handleAdd = (operate) => {
    this.props.dispatch(contextOperate(operate));
  }

  handleChangeTab = (index, item) => {
    this.props.dispatch(changeTab(index, item));
  }

  handleOpen = (path, id, text) => e => {
    e.stopPropagation();
    this.props.dispatch(select(path, id, text));//text打开对应的Tab
  }

  handleClose = (index) => (e) => {
    e.stopPropagation();
    this.props.dispatch(closeTab(index));
  }

  showMore = (e) => {
    e.stopPropagation();
    this.setState({
      showMore: !this.state.showMore
    });
  }

  updateScope = (flag, prevSelectedTabs, selectedTabs, selectedTabIds, prevActiveIndex, activeIndex, props, state) => {
    if (flag && ((prevSelectedTabs.length === selectedTabs.length && (prevActiveIndex === null || prevActiveIndex === activeIndex)) && !state.reRender)) {
      const same = prevSelectedTabs.every((tab, index) => tab == selectedTabs[index]);
      if (same) {
        // console.log("5 return");
        return
      }
    }
    // console.log("2 not return");
    const container = document.getElementById("mytabs-container");
    const titlesBox = document.getElementById("mytabs-titles");
    const titlesObj = titlesBox.getElementsByClassName("my-tabs-tab");
    const titlesArr = Array.from(titlesObj);
    const float = document.getElementById("mytabs-float");
    const button = document.getElementById("mytabs-button");
    let widthLeft = container.clientWidth - float.clientWidth - button.clientWidth - 10;
    let showList = [], showListId = [], hideList = [], hideListId = [], reRender = false;
    titlesArr.reverse().map((title, index) => {
      const theWidth = title.clientWidth;
      const thePath = title.getAttribute("data-path");
      const theId = title.getAttribute("data-id");
      widthLeft -= theWidth;
      if (widthLeft < 0) {
        hideList.unshift(thePath);
        hideListId.unshift(theId);
        if (activeIndex === selectedTabs.length-index-1) {
          reRender = true;
        }
      } else {
        showList.unshift(thePath);
        showListId.unshift(theId);
      }
    });
    if (reRender) {
      // console.log('6 rerender');
      let newSelectedTabs = Array.from(selectedTabs);
      const tmpActiveTabArr = newSelectedTabs.splice(activeIndex, 1);
      const newActiveIndex = newSelectedTabs.length;
      newSelectedTabs.splice(newActiveIndex, 0, tmpActiveTabArr[0]);
      let newSelectedTabIds = Array.from(selectedTabIds);
      const tmpActiveTabIdArr = newSelectedTabIds.splice(activeIndex, 1);
      newSelectedTabIds.splice(newActiveIndex, 0, tmpActiveTabIdArr[0]);
      props.dispatch(rearrangeTab(newSelectedTabs, newSelectedTabIds, newActiveIndex));
      this.setState({
        reRender: true
      });
    } else {
      // console.log('3');
      this.setState({
        showList,
        showListId,
        hideList,
        hideListId,
        wholeRender: false
      });
    }
  }

  componentDidMount = () => {
    // console.log("1 mount");
    this.updateScope();
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    this.setState({
      wholeRender: true,
      reRender: false
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("4 update");
    this.updateScope(true, prevProps.selectedTabs, this.props.selectedTabs, this.props.selectedTabIds, prevProps.activeIndex, this.props.activeIndex, this.props, this.state);
  }

  render = () => {
    const { selectedTabs, selectedTabIds, activeIndex, parsedRes, notSaveState } = this.props;
    const handleChangeTab = this.handleChangeTab;
    const handleClose = this.handleClose;
    const handleOpen = this.handleOpen;
    const { showList, showListId, hideList, hideListId, wholeRender } = this.state;
    // console.log('lists', showList, hideList);
    return (
      <div className="ant-tabs-nav-container yo-tabs-nav-container" id="mytabs-container">
        <div className="ant-tabs-nav yo-tabs-nav" id="mytabs-titles">
         {
          wholeRender ? <TitleContainer showList={selectedTabs} showListId={selectedTabIds} parsedRes={parsedRes} activeIndex={activeIndex} handleChangeTab={handleChangeTab} notSaveState={notSaveState} handleClose={handleClose} baseIndex={0}/>
          : <TitleContainer showList={showList} showListId={showListId} parsedRes={parsedRes} activeIndex={activeIndex} handleChangeTab={handleChangeTab} notSaveState={notSaveState} handleClose={handleClose} baseIndex={hideList.length}/>
         }
         {
            <div className="add-tabs-button" id="mytabs-button" onClick={() => this.handleAdd("addWork")}>
              <span>+ 新建</span>
            </div>
         }
         </div>
          <div className="add-tabs-overflow" id="mytabs-float">
            {
              hideList.length ? <span className="add-tabs-overflow-text" onClick={this.showMore}>隐藏</span> : null
            }
            {
              this.state.wholeRender ? null : this.state.showMore && hideList.length !== 0 &&
              <ul className="add-tabs-addon-lists">
                {
                  hideList.map((path, index) => {
                    const theMenuArr = path.split("-");
                    const type = theMenuArr[0] === "0";
                    const theMenuTab = type ? theMenuArr.slice(0,2).join("-") : theMenuArr.slice(1,3).join("-");
                    const title = type ? parsedRes[theMenuTab]["works"][path] : parsedRes[theMenuTab]["trash"][path];
                    const id = hideListId[index];
                    return <li key={path} className="add-tabs-addon-item" onClick={handleOpen(path, id, title)}>
                      <span className="add-tabs-addon-text">{title}<i className="anticon anticon-close" onClick={handleClose(index)}></i></span>
                    </li>
                  })
                }
              </ul>
            }
          </div>
      </div>
      )
  }
}
const mapStateToProps = (state) => {
  const { menusReducer: { activeIndex, selectedTabs, selectedTabIds, parsedRes } } = state;
  return { activeIndex, selectedTabs, selectedTabIds, parsedRes };
}

export default connect(mapStateToProps)(TabContainer);
