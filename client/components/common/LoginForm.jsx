import React, { Component } from 'react';
import { Input, Icon, Button, Form } from 'antd';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
        };
        this.changeUsername = this.changeUsername.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeUsername = e => {
        this.setState({
            username: e.target.value
        });
    }
    ChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = e => {
        this.props.onSubmit(this.state.username, this.state.password);
    }

    render() {
        const { username, password, isSubmit } = this.state;

        return (
            <div>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='账号'
                        value={username}
                        onChange={this.changeUsername}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='密码'
                        value={password}
                        onChange={this.ChangePassword}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        block={true}
                        shape='round'
                        onClick={this.onSubmit}
                        className='login-form-button'>
                        登录
                    </Button>
                </Form.Item>
            </div>
        );
    }
}
