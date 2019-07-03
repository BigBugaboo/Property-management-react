import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

import '@/styles/components/common/nav.scss';

const { SubMenu, Item } = Menu;

/** 左侧导航栏 */
export default class Nav extends Component {

    static propTypes = {
        menu: PropTypes.object
    }

    static defaultProps = {

    }

    onClick = (e) => {
        console.log(e);
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
                                {item.children.map(child => (
                                    <Item>{child.title}</Item>
                                ))}
                            </SubMenu>
                            :
                            <Item>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Item>
                    ))}
                </Menu>
            </>
        );
    }
}