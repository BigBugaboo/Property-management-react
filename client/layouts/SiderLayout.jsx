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
                        path: '/Main/Index',
                        icon: 'snippets',
                    },
                    {
                        title: '缴费',
                        icon: 'user',
                        children: [
                            {
                                title: '账号管理',
                                path: '/Main/Account',
                            }
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
