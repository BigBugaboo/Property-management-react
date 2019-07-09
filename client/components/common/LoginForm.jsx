import React, { Component } from 'react';
import { Input, Icon, Button, Form } from 'antd';

import '@/styles/layouts/login.scss';

import ad from '@/assets/bg.png';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleSubmit = e => {
        e.preventDefault();
        // let history = this.props.history;
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //         // history.push('/View');
        //     }
        // });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className='login-form'>
                <Form.Item>
                    <Input
                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='Username'
                    />,
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='Password'
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
