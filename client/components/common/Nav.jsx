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
                <div className='logo' />
                <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
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
                                        { item.path && <Link to={child.path} /> }
                                        {child.title}
                                    </Item>
                                ))}
                            </SubMenu>
                            :
                            <Item key={index}>
                                { item.path && <Link to={item.path} />}
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Item>
                    ))}
                </Menu>
            </>
        );
    }
}
