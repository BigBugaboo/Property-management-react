import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '@/styles/components/common/nav.scss';
import logo from '@/assets/logo.png';

const { SubMenu, Item } = Menu;

/** 左侧导航栏 */
export default class Nav extends Component {

    static propTypes = {
        menu: PropTypes.object
    }

    static defaultProps = {

    }

    render() {
        const { menu, collapsed } = this.props;

        return (
            <>
                <Menu id='nav' theme='dark' mode='inline'>
                    <div className='header'>
                        <img className='logo' src={logo} />
                        {collapsed || <p className='logo-title'>物业管理</p>}
                    </div>
                    {menu.list.map((item, index) => (
                        item.children ?
                            <SubMenu
                                key={index}
                                title={
                                    <span>
                                        <Icon type={item.icon} />
                                        <span>{item.title}</span>
                                    </span>
                                }>
                                {item.children.map((child, key) => (
                                    <Item key={index * 10 + key}>
                                        {child.path && <Link to={child.path} />}
                                        {child.title}
                                    </Item>
                                ))}
                            </SubMenu>
                            :
                            <Item key={index}>
                                {item.path && <Link to={item.path} />}
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Item>
                    ))}
                </Menu>
            </>
        );
    }
}
