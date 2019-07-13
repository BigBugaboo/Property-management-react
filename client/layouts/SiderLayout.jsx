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
                        icon: 'setting',
                    },
                    {
                        title: '住户管理',
                        path: '/Main/Resident',
                        icon: 'home',
                    },
                    {
                        title: '投诉管理',
                        path: '/Main/Complaints',
                        icon: 'message',
                    },
                    {
                        title: '报修管理',
                        path: '/Main/Repair',
                        icon: 'tool',
                    },
                    {
                        title: '缴费管理',
                        path: '/Main/Bills',
                        icon: 'money-collect',
                    },
                    {
                        title: '车位管理',
                        path: '/Main/Park',
                        icon: 'car',
                    },
                ]
            },
            userMenu: {
                title: '物业管理系统',
                icon: 'desktop',
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
