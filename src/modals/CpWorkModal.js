import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'antd';
import Cascader from '../Cascader/index';
import { contextItem, cpWork } from '../actions/actions';

class CpWorkModal extends Component {

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
    this.props.dispatch(cpWork(newFile));
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.dispatch(contextItem(""));
  }

  render() {

    const { contextOperate, contextButton } = this.props;
    return (
      <div>
        <Modal title="复制工作流" visible={ !contextButton && contextOperate === "cpWork" }
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <form className="ant-form">
            <div className="ant-row ant-form-item">
              <div className="ant-col-4 ant-form-item-label">
                <label /*htmlFor=""*/>
                  名称
                </label>
              </div>
              <div className="ant-col-18">
                <input type="text" placeholder="请输入工作流名称" className="ant-input" ref="input" />
              </div>
            </div>
            <div className="ant-row ant-form-item">
              <div className="ant-col-4 ant-form-item-label">
                <label /*htmlFor=""*/>
                  所属目录
                </label>
              </div>
              <div className="ant-col-18">
                <Cascader />
              </div>
            </div>
           </form>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { menuConReducer: { contextInfo, contextOperate, contextButton } } = state;
  return { contextInfo, contextOperate, contextButton };
}

export default connect(mapStateToProps)(CpWorkModal);