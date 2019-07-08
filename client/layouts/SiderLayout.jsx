import React, { Component } from 'react';
import { Layout } from 'antd';

import Nav from '@/components/common/Nav';
import TopBanner from '@/components/common/TopBanner';
import Index from '@/pages/Index';


const { Header, Content, Footer, Sider } = Layout;

/** 侧边导航栏布局 */
class SiderLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,   // 收缩状态
            menu: {
                title: '物业管理系统',
                icon: 'desktop',
                path: '/index',
                list: [
                    {
                        title: '首页管理',
                        path: '',
                        icon: 'snippets',
                    },
                    {
                        title: '基本设置',
                        path: '',
                        icon: 'user',
                        children: [
                            {
                                title: '管理员密码修改',
                                path: '',
                            }
                        ],
                    },
                    {
                        title: '住户资料管理',
                        icon: 'home',
                        children: [
                            {
                                title: '住户基本资料添加',
                                path: '',
                            },
                            {
                                title: '管理',
                                path: '',
                            },
                        ],
                    },
                    {
                        title: '投诉管理',
                        icon: 'message',
                        children: [
                            {
                                title: '投诉添加',
                                path: '',
                            },
                            {
                                title: '投诉管理',
                                path: '',
                            },
                        ],
                    },
                    {
                        title: '报修管理',
                        icon: 'tool',
                        children: [
                            {
                                title: '报修添加',
                                path: '',
                            },
                            {
                                title: '报修管理',
                                path: '',
                            },
                        ],
                    },
                    {
                        title: '缴费管理',
                        icon: 'money-collect',
                        children: [
                            {
                                title: '缴费添加',
                                path: '',
                            },
                            {
                                title: '缴费管理',
                                path: '',
                            }
                        ],
                    },
                    {
                        title: '停车场车位管理',
                        icon: 'car',
                        children: [
                            {
                                title: '停车位添加',
                                path: '',
                            },
                            {
                                title: '信息管理',
                                path: '',
                            }
                        ],
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
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <TopBanner />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Index />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>电科大16级-计算机-软件/吴彦组制作</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderLayout;
