import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'yo-component';
import { contextItem, mvWork } from '../actions/actions';

class MvWorkModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }
  }

  // menus: [
  //   {'工作流开发': [{'4G业务': ['text_workflow', 'text_phone']}, {'宽带业务': ['21','22']}, {'信令': [{"二级目录": [{"三级目录": ['工作流']}]}]}]},
  //   {'回收站': [{'d1':['d1.1','d1.2']}]}
  // ]
  handleOk = (e) => {
    console.log('Clicked OK');
    this.props.dispatch(mvWork());
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextItem(""));
  }

  render() {

    const { contextOperate, contextButton } = this.props;
    return (
      <div>
        <Modal title="删除工作流" visible={ !contextButton && contextOperate === "mvWork" }
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <span>是否要删除该工作流？</span>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menuConReducer: { contextInfo, contextOperate, contextButton } } = state;
  return { contextInfo, contextOperate, contextButton };
}

export default connect(mapStateToProps)(MvWorkModal);