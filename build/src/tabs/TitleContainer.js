import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ContextMenu from '../contexts/ContextMenu';
import ContextTrigger from '../contexts/ContextTrigger';
import DisplayContainer from '../utils/DisplayContainer';
import { contextItem, contextMenuShow } from '../actions/actions';

@DisplayContainer
class TitleContainer extends Component {

	static defaultProps = {
    holdToDisplay: 1000
  }

	constructor(props) {
		super(props);

    // this.state = {
    //   menuShow: false,
    //   x: 0,
    //   y: 0
    // }
	}

	handleContextClick = (path, id, text, contextType) => (event) => {
    event.preventDefault();
    event.stopPropagation();

    const x = event.clientX;// || (event.touches && event.touches[0].pageX)
    const y = event.clientY;// || (event.touches && event.touches[0].pageY)
    console.log("context", x, y);

    // this.setState({
    //   menuShow: true,
    //   x,
    //   y
    // });
    this.props.dispatch(contextMenuShow(x, y, true));
    this.props.dispatch(contextItem(path, id, text, contextType));
    this.props.wrapDisplayProps.show();
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if (this.props.wrapDisplayProps.showFlag && !nextProps.wrapDisplayProps.showFlag) {
      this.props.dispatch(contextMenuShow(0, 0, false));
    }
  }

	render() {
		
		const { showList, showListId, parsedRes, activeIndex, handleChangeTab, notSaveState, handleClose, baseIndex } = this.props;
    const handleContextClick = this.handleContextClick;
    // console.log("test", showList, showListId);
    return (
      <div className="tabs-box contextflag">
        <ContextTrigger >
          {
            showList.map((path, index) => {
              const theMenuArr = path.split("-");
              const type = theMenuArr[0] === "0";
              const theMenuTab = type ? theMenuArr.slice(0,2).join("-") : theMenuArr.slice(1,3).join("-");
              const title = type ? parsedRes[theMenuTab]["works"][path] : parsedRes[theMenuTab]["trash"][path];
              const id = showListId[index];
                return <div className={classNames("contextflag", "ant-tabs-tab", "my-tabs-tab", {"ant-tabs-tab-active": index+baseIndex===activeIndex})} key={path} data-path={path} data-id={id} onClick={() => handleChangeTab(index+baseIndex, path)} onContextMenu={handleContextClick(path, id, title, "closeTabs")}>
                  {notSaveState && notSaveState[path] && <span>*</span>}
                  <span className="my-tabs-tab-title contextflag">{title}</span>
                  <i className="anticon anticon-close" onClick={handleClose(index+baseIndex)}></i>
                </div>
              })
          }
        </ContextTrigger>
      </div>
    );
  }

}

export default connect()(TitleContainer);

