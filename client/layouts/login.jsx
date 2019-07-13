import React, { Component } from 'react';
import { Carousel, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/loginStatus';

import { _login } from '@/api/login.js';
import '@/styles/layouts/login.scss';
import LoginForm from '@/components/common/LoginForm';
import { isEmpty } from '@/utils/index.js';

import ad from '@/assets/bg1.png';

const mapStateToProps = (state, ownProps) => {
    return state.loginStatus;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onSubmit = (username, password, status) => {
        // if (isEmpty()) {
        //     message.info('This is a normal message');
        //     return;
        // }

        const date = {
            username: username,
            password: password
        };
        console.log(date);

        // const result = _login('', date);
        let history = this.props.history;
        history.push('/Main/Index');
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //         // history.push('/View');
        //     }
        // });
    };

    onClick = (status) => {
        let history = this.props.history;
        if (status === 0) {
            this.props.actions.admin();
            history.push('/Main/Account');
        }
        else {
            this.props.actions.user();
            history.push('/Main/UserInfo');
        }
    }

    render() {
        return (
            <div id='login'>
                <div className='header'>
                    <p>物业管理系统</p>
                </div>
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
                            <h2>物业管理系统 | 登录</h2>
                            <LoginForm onSubmit={this.onSubmit} />
                            <button onClick={this.onClick.bind(this, 0)}>管理员</button>
                            <button onClick={this.onClick.bind(this, 1)}>住户</button>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <p>电子科技大学中山学院·最帅软件团队-吴彦组</p>
                </div>
            </div>
        );
    }
}

export default Login;
