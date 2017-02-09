import React from 'react';
import { cloneElement } from 'react';
import RcTabs, { TabPane } from 'rc-tabs';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import classNames from 'classnames';
import Icon from '../icon';
import warning from '../_util/warning';
export default class Tabs extends React.Component {
    constructor() {
        super(...arguments);
        this.createNewTab = (targetKey) => {
            const onEdit = this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'add');
            }
        };
        this.removeTab = (targetKey, e) => {
            e.stopPropagation();
            if (!targetKey) {
                return;
            }
            const onEdit = this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'remove');
            }
        };
        this.handleChange = (activeKey) => {
            const onChange = this.props.onChange;
            if (onChange) {
                onChange(activeKey);
            }
        };
    }
    render() {
        let { prefixCls, className = '', size, type = 'line', tabPosition, children, tabBarExtraContent, hideAdd, onTabClick, animated, } = this.props;
        warning(!(type.indexOf('card') >= 0 && size === 'small'), 'Tabs[type=card|editable-card] doesn\'t have small size, it\'s by designed.');
        let cls = classNames(className, {
            [`${prefixCls}-mini`]: size === 'small' || size === 'mini',
            [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
            [`${prefixCls}-card`]: type.indexOf('card') >= 0,
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-no-animation`]: !animated,
        });
        // only card type tabs can be added and closed
        let childrenWithClose;
        if (type === 'editable-card') {
            childrenWithClose = [];
            React.Children.forEach(children, (child, index) => {
                childrenWithClose.push(cloneElement(child, {
                    tab: (<div>
              {child.props.tab}
              <Icon type="close" onClick={(e) => this.removeTab(child.key, e)}/>
            </div>),
                    key: child.key || index,
                }));
            });
            // Add new tab handler
            if (!hideAdd) {
                tabBarExtraContent = (<span>
            <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab}/>
            {tabBarExtraContent}
          </span>);
            }
        }
        tabBarExtraContent = tabBarExtraContent ? (<div className={`${prefixCls}-extra-content`}>
        {tabBarExtraContent}
      </div>) : null;
        const renderTabBar = () => (<ScrollableInkTabBar extraContent={tabBarExtraContent} onTabClick={onTabClick}/>);
        return (<RcTabs {...this.props} className={cls} tabBarPosition={tabPosition} renderTabBar={renderTabBar} renderTabContent={() => <TabContent animated={animated} animatedWithMargin/>} onChange={this.handleChange}>
        {childrenWithClose || children}
      </RcTabs>);
    }
}
Tabs.TabPane = TabPane;
Tabs.defaultProps = {
    prefixCls: 'ant-tabs',
    hideAdd: false,
    animated: true,
};
