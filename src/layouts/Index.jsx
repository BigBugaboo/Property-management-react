import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

import Nav from '@/components/common/Nav';

const { Header, Content, Footer, Sider } = Layout;

/** 侧边导航栏布局 */
export default class SiderLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,   // 收缩状态
            menu: {
                title: '物业管理系统',
                icon: 'desktop',
                list: [
                    {
                        title: '公示栏',
                        path: '',
                        icon: 'snippets',
                    },
                    {
                        title: '缴费',
                        icon: 'account-book',
                        children: [
                            {
                                title: '水电费',
                                path: '',
                            },
                            {
                                title: '物业费',
                                path: '',
                            },
                        ],
                    },
                    {
                        title: '小区相关信息',
                        icon: 'bar-chart',
                    }
                ]
            }
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { menu } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Nav menu={menu} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}
