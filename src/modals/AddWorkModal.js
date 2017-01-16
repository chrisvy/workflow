import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'antd';
import { contextItem, addWorkflow } from '../actions/actions';

class AddWorkModal extends Component {

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
    const newFile = this.refs.input.value;//校验
    console.log('Clicked OK', newFile);
    this.props.dispatch(addWorkflow(newFile));
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextItem(""));
  }

  render() {

    const { contextOperate, contextButton } = this.props;
    return (
      <div>
        <Modal title="Add File" visible={ !contextButton && contextOperate === "addWorkflow" }
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <input type="text" placeholder="请输入目录名称" className="ant-input" ref="input" />
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menuConReducer: { contextInfo, contextOperate, contextButton } } = state;
  return { contextInfo, contextOperate, contextButton };
}

export default connect(mapStateToProps)(AddWorkModal);