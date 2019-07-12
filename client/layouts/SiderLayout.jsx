import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import Nav from '@/components/common/Nav';
import TopBanner from '@/components/common/TopBanner';


const { Header, Content, Footer, Sider } = Layout;

const mapStateToProps = (state, ownProps) => {
    return state.loginStatus;
};

/** 侧边导航栏布局 */
@connect(mapStateToProps)
class SiderLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,   // 收缩状态
            adminMenu: {
                title: '物业管理系统',
                icon: 'desktop',
                list: [
                    {
                        title: '基本设置',
                        path: '/Main/Account',
                        icon: 'snippets',
                    },
                    {
                        title: '住户资料管理',
                        path: '/Main/Resident',
                        icon: 'snippets',
                    },
                    {
<<<<<<< HEAD
                        title: '基本设置',
                        icon: 'user',
                        children: [
                            {
                                title: '账号信息管理',
                                path: '/Main/Account',
                            }
                        ],
                    },
                    {
                        title: '住户管理',
                        icon: 'home',
                        children: [
                            {
                                title: '住户信息添加',
                                path: '/Index',
                            },
                            {
                                title: '住户信息管理',
                                path: '/Index',
                            },
                        ],
                    },
                    {
                        title: '投诉管理',
                        icon: 'message',
                        children: [
                            {
                                title: '投诉信息添加',
                                path: '/Index',
                            },
                            {
                                title: '投诉信息管理',
                                path: '/Index',
                            },
                        ],
                    },
                    {
                        title: '报修管理',
                        icon: 'tool',
                        children: [
                            {
                                title: '报修信息添加',
                                path: '',
                            },
                            {
                                title: '报修信息管理',
                                path: '',
                            },
                        ],
                    },
                    {
                        title: '缴费管理',
                        icon: 'money-collect',
                        children: [
                            {
                                title: '缴费信息添加',
                                path: '',
                            },
                            {
                                title: '缴费信息管理',
                                path: '',
                            }
                        ],
=======
                        title: '投诉管理',
                        path: '/Main/Compaints',
                        icon: 'snippets',
                    },
                    {
                        title: '报修管理',
                        path: '/Main/Repair',
                        icon: 'snippets',
                    },
                    {
                        title: '缴费管理',
                        path: '/Main/Bills',
                        icon: 'snippets',
>>>>>>> 445091b9e4d644db19040117d67a27fa6e55f661
                    },
                    {
                        title: '停车车位管理',
                        path: '/Main/Park',
                        icon: 'snippets',
                    },
                ]
            },
            userMenu: {
                title: '物业管理系统',
                icon: 'desktop',
                path: '/Main',
                list: [
                    {
                        title: '首页管理',
                        icon: 'user',
                        children: [
                            {
                                title: '个人基本信息',
                                path: '/Main/UserInfo',
                            },
                        ],
                    },
                    {
                        title: '缴费管理',
                        icon: 'money-collect',
                        children: [
                            {
                                title: '个人缴费信息',
                                path: '/Main/UserPayment',
                            },
                        ],
                    },
                    {
                        title: '报修管理',
                        icon: 'tool',
                        children: [
                            {
                                title: '个人报修信息',
                                path: '/Main/UserRepair',
                            },
                        ],
                    },
                    {
                        title: '投诉管理',
                        icon: 'message',
                        children: [
                            {
                                title: '个人投诉信息',
                                path: '/Main/UserComplaint',
                            },
                        ],
                    },
                ]
            }
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { adminMenu, userMenu } = this.state;
        const { loginStatus } = this.props;

        const menu = loginStatus === 0 ? adminMenu : userMenu;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Nav menu={menu} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <TopBanner />
                    </Header>
                    <Content style={{ margin: '16px 16px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>电科大16级-计算机-软件/吴彦组制作</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderLayout;
