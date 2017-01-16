import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'antd';
import { contextOperate, addFile } from '../redux/actions';

class AddFileModal extends Component {

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
    this.props.dispatch(addFile(newFile));
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextOperate(""));
  }

  render() {
    return (
      <div>
        <Modal title="Add File" visible={this.props.contextOperate === "addFile"}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <input type="text" placeholder="请输入目录名称" className="ant-input" ref="input" />
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menus, contextInfo, contextOperate } = state;
  return { menus, contextInfo, contextOperate };
}

export default connect(mapStateToProps)(AddFileModal);
