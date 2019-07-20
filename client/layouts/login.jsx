import React, { Component } from 'react';
import { Carousel, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

import { login } from '@/api/common/log.js';
import '@/styles/layouts/login.less';
import LoginForm from '@/components/common/LoginForm';

import ad from '@/assets/bg-1.png';

const mapStateToProps = (state) => {
    return state.stores;
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onSubmit = async (username, password) => {
        const data = {
            username: username,
            password: password
        };
        const result = await login(data);
        if (result.data === null) {
            message.error(result.msg);
            return false;
        }
        let status = result.data.role;
        window.sessionStorage.removeItem('Token');
        window.sessionStorage.setItem('Token', result.data.Token);

        let history = this.props.history;
        this.props.actions.setName(result.data.username);
        if (status === '管理员') {
            this.props.actions.admin();
            history.replace('/Main/Account');
        }
        else {
            this.props.actions.user();
            history.replace('/Main/UserInfo');
        }
    };

    render() {
        return (
            <div id='login'>
                <div className='container'>
                    <div className='ad'>
                        <Carousel autoplay={true}>
                            <img className='item' src={ad} />
                            <img className='item' src={ad} />
                            <img className='item' src={ad} />
                            <img className='item' src={ad} />
                        </Carousel>
                    </div>
                    <div className='form-group'>
                        <div className='input-list'>
                            <h2 className='form-title'>物业管理系统 | 登录</h2>
                            <LoginForm onSubmit={this.onSubmit} />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <p>吴彦组</p>
                </div>
            </div>
        );
    }
}

export default Login;
