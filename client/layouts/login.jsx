import React, { Component } from 'react';
import { Carousel } from 'antd';

import { _login } from '@/api/login.js';
import '@/styles/layouts/login.scss';
import LoginForm from '@/components/common/LoginForm';

import ad from '@/assets/bg1.png';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleSubmit = e => {
        // e.preventDefault();
        let history = this.props.history;
        history.push('/Main/Index');
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //         // history.push('/View');
        //     }
        // });
    };

    render() {
        return (
            <div id='login'>
                <div className='header'>
                    <p>物业管理系统</p>
                </div>
                <div className='container'>
                    <div className='ad'>
                        <Carousel autoplay>
                            <img className='item' src={ad} />
                            <img className='item' src={ad} />
                            <img className='item' src={ad} />
                            <img className='item' src={ad} />
                        </Carousel>
                    </div>
                    <div className='form-group'>
                        <div className='input-list'>
                            <h2>物业管理系统 | 登录</h2>
                            <LoginForm handleSubmit={this.handleSubmit} />
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
