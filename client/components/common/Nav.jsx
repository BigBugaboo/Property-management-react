import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '@/styles/components/common/nav.scss';

const { SubMenu, Item } = Menu;

/** 左侧导航栏 */
export default class Nav extends Component {

    static propTypes = {
        menu: PropTypes.object
    }

    static defaultProps = {

    }

    render() {
        const { menu } = this.props;

        return (
            <>
                <Menu id='nav' theme='dark' defaultSelectedKeys={['0']} mode='inline'>
                    <div className='logo' />
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
