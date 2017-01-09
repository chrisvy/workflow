import React from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import '../styles/mystyle.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: '1',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  componentDidMount() {
    // document.querySelector('.ant-menu-submenu-title').addEventListener('mouseup', e => {
    //   console.log('mouseup');
    //   e.preventDefault();
    //   if (!e) e = window.event;
    //   if (e.button == 2) {
    //     this.refs.myTopPopup.style.display = 'block';
    //   }
    // });
  },
  componentWillUnmount() {
    document.querySelector('.ant-menu-submenu-title').removeEventListener('mouseup');
  },
  render() {
    return (
      <div className="ant-row">
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5">
          <Menu onClick={this.handleClick}
            style={{ width: 240 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>工作流开发</span></span>}>
              <SubMenu key="sub2" title="4G业务">
                <Menu.Item key="1">text_workflow</Menu.Item>
                <Menu.Item key="2">test_phone</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="宽带业务">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="信令">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub5" title={<span><Icon type="appstore" /><span>回收站</span></span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub6" title={<span><Icon type="setting" /><span>其他</span></span>}>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
              <Menu.Item key="13">Option 13</Menu.Item>
              <Menu.Item key="14">Option 14</Menu.Item>
            </SubMenu>
          </Menu>
          {/* <div className="mypopup">
            <div className="myTopPopup" ref='myTopPopup'>
              <div>新建目录</div>
              <div>新建工作流</div>
            </div>
            <div className="mySubPopup" ref='mySubPopup'>
              <div>还原到</div>
              <div>彻底删除</div>
            </div>
          </div> */}
        </div> 
        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-18 ant-col-lg-19">
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Sider;