import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { contextOperate, changeTab, closeTab, rearrangeTab, select } from '../actions/actions';

class Titles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showList: [],
      hideList: [],
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

  handleOpen = (path, text) => e => {
    e.stopPropagation();
    this.props.dispatch(select(path, text));//text打开对应的Tab
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

  updateScope = (flag, prevSelectedTabs, selectedTabs, prevActiveIndex, activeIndex, props, state) => {
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
    let showList = [], hideList = [], reRender = false;
    titlesArr.reverse().map((title, index) => {
      const theWidth = title.clientWidth;
      const theId = title.getAttribute("data-id");
      widthLeft -= theWidth;
      if (widthLeft < 0) {
        hideList.unshift(theId);
        if (activeIndex === selectedTabs.length-index-1) {
          reRender = true;
        }
      } else {
        showList.unshift(theId);
      }
    });
    if (reRender) {
      // console.log('6 rerender');
      let newSelectedTabs = Array.from(selectedTabs);
      const tmpActiveTabArr = newSelectedTabs.splice(activeIndex, 1);
      const newActiveIndex = newSelectedTabs.length;
      newSelectedTabs.splice(newActiveIndex, 0, tmpActiveTabArr[0])
      props.dispatch(rearrangeTab(newSelectedTabs, newActiveIndex));
      this.setState({
        reRender: true
      });
    } else {
      // console.log('3');
      this.setState({
        showList,
        hideList,
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
    this.updateScope(true, prevProps.selectedTabs, this.props.selectedTabs, prevProps.activeIndex, this.props.activeIndex, this.props, this.state);
  }

  render = () => {
    const { selectedTabs, tmpIndex, activeIndex, parsedRes, notSaveState } = this.props;
    const handleChangeTab = this.handleChangeTab;
    const handleClose = this.handleClose;
    const handleOpen = this.handleOpen;
    const { showList, hideList } = this.state;
    // console.log('lists', showList, hideList);
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
          : showList.map((item, index) => {
              const title = parsedRes["works"][item];
              // console.log("title", title);
                return <div className={classNames("ant-tabs-tab", "my-tabs-tab", {"ant-tabs-tab-active": index+hideList.length===activeIndex})} key={item} data-id={item} onClick={() => handleChangeTab(index+hideList.length, item)}>
                  {notSaveState && notSaveState[item] && <span>*</span>}
                  <span className="my-tabs-tab-title">{title}</span>
                  <i className="anticon anticon-close" onClick={handleClose(index+hideList.length)}></i>
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
            {
              hideList.length ? <span className="add-tabs-overflow-text" onClick={this.showMore}>隐藏</span> : null
            }
            {
              this.state.wholeRender ? null : this.state.showMore && hideList.length !== 0 &&
              <ul className="add-tabs-addon-lists">
                {
                  hideList.map((item, index) => {//item means path
                    const title = parsedRes["works"][item];
                    return <li key={item} className="add-tabs-addon-item" onClick={handleOpen(item, title)}>
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
  const { menuReducer: { tmpIndex, activeIndex, selectedTabs, parsedRes } } = state;
  return { tmpIndex, activeIndex, selectedTabs, parsedRes };
}

export default connect(mapStateToProps)(Titles);
