import React, { Component } from 'react';
import { Button } from 'antd';

import '@/styles/components/common/top-banner.scss';

export default class TopBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
    }

    render() {
        const { isLogin } = this.state;

        return (
            <div id='top-banner'>
                {isLogin ?
                    <div>
                        欢迎XXX，进入物业管理系统。
                        <Button
                            icon='logout'
                            shape='round'
                            type='danger'>
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
