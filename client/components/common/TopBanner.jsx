import React, { Component } from 'react';
import { Button } from 'antd';

import '@/styles/components/common/top-banner.scss';

/** 顶部工具栏 */
class TopBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
    }

    onLogout = () => {
        let history = this.props.history;
        console.log(history);
        history.push('/Main');
    }

    render() {
        const { isLogin } = this.state;
        const { name, onLogout } = this.props;

        return (
            <div id='top-banner'>
                {isLogin ?
                    <div>
                        欢迎{name}，进入物业管理系统。
                        <Button
                            size='small'
                            icon='logout'
                            shape='round'
                            type='danger'
                            onClick={onLogout}>
                            注销
                        </Button>
                    </div>
                    :
                    <Button
                        icon='login'
                        shape='round'
                        type='primary'>
                        登录
                    </Button>
                }
            </div>
        );
    }
}

export default TopBanner;
