import React, { Component } from 'react';
import PropType from 'prop-types';
import { Drawer, Form, Button, Col, Row, Icon, Modal, Input, Select } from 'antd';

import { _list, _edit } from '@/api/user/UserInfo.js';
import '@/styles/pages/user/UserInfo.less';

export class UserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {
                account: {
                    permission: '',
                    realName: '',
                    username: ''
                },
                proprietor: {
                    id: '',
                    phone: '',
                    realName: '',
                    houseNumber: '',
                    address: ''
                },
                carport: {
                    id: '',
                    stopDate: [
                        '',
                        ''
                    ],
                    status: ''
                }
            },
            form: [
                {
                    text: '联系电话',
                    name: 'phone',
                    placeholder: '请填写联系电话',
                    value: '',
                },
                {
                    text: '住户姓名',
                    name: 'name',
                    placeholder: '请填写住户姓名',
                    value: '',
                },
                {
                    text: '房屋编号',
                    name: 'house',
                    placeholder: '请填写房屋编号',
                    value: '',
                },
                {
                    text: '联系地址',
                    name: 'address',
                    placeholder: '请填写联系地址',
                    value: '',
                },
            ]
        };
        this.onChangeA = this.onChangeA.bind(this);
        this.onChangeB = this.onChangeB.bind(this);
    }

    onChangeA = (e) => {
        let user = this.state.data;
        user.password = e.target.value;
        this.setState({
            data: user
        });
        console.log(user);
    };
    onChangeB = (name, key, e) => {
        let userForm = this.state.data;
        userForm[name] = e.target.value;
        this.setState({
            data: userForm
        });
        console.log(userForm);
    };

    show = () => {
        this.setState({
            visibleA: true,
        });
    };
    showDrawer = () => {
        this.setState({
            visibleB: true,
        });
    };
    hide = () => {
        this.setState({
            visibleA: false,
            visibleB: false,
        });
    };

    onSubmit = () => {
        this.hide();
        console.log(this.state.data);
    }

    onhide = () => {
        this.setState({
            isLoading: false
        });
    }
    onshow = () => {
        this.setState({
            isLoading: true
        });
    }

    componentDidMount() {
        this.onshow();
        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        let list = data ? data : result.data;
        console.log(list);
        this.setState({
            data: list
        });
        this.onhide();
    }

    render() {

        const { form, data, isLoading } = this.state;
        return (
            <div id='base'>
                <div className='top'>
                    <div className='blo'>
                        <div className='title'>
                            <h2>账号信息</h2>
                            <div>
                                <Button type='primary' onClick={this.show}>
                                    <Icon type='edit' />
                                </Button>
                                <Modal
                                    title='修改账号信息'
                                    visible={this.state.visibleA}
                                    onOk={this.onSubmit}
                                    onCancel={this.hide}
                                    okText='确认'
                                    cancelText='取消'>

                                    <p>账号密码：</p>
                                    <Input
                                        placeholder={'请设置密码'}
                                        defaultValue={data.password}
                                        onChange={this.onChangeA}
                                        form={ [
                                            {
                                                text: '联系电话',
                                                name: 'phone',
                                                placeholder: '请填写联系电话',
                                                value: data.phone,
                                            },
                                            {
                                                text: '住户姓名',
                                                name: 'name',
                                                placeholder: '请填写住户姓名',
                                                value: data.name,
                                            },
                                            {
                                                text: '房屋编号',
                                                name: 'house',
                                                placeholder: '请填写房屋编号',
                                                value: data.house,
                                            },
                                            {
                                                text: '联系地址',
                                                name: 'address',
                                                placeholder: '请填写联系地址',
                                                value: data.address,
                                            },
                                        ]}
                                    />
                                </Modal>
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='info'>
                            <p>账号编号：{data.account.username}</p>
                            <p>住户姓名：{data.account.realName}</p>
                            <p>权限：{data.account.permission}</p>
                        </div>
                    </div>
                    <div className='blo'>
                        <div className='title'>
                            <h2>住户信息</h2>
                            <div>
                                <Button type='primary' onClick={this.showDrawer}>
                                    <Icon type='edit' />
                                </Button>
                                <Drawer
                                    title='修改住户信息'
                                    width={400}
                                    onClose={this.hide}
                                    visible={this.state.visibleB}>
                                    <div>
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                {form.map((item, index) => (
                                                    <Form.Item label={item.text} key={index}>
                                                        <Input
                                                            placeholder={item.placeholder}
                                                            defaultValue={item.value}
                                                            onChange={this.onChangeB.bind(this, item.name, index)}
                                                        />
                                                    </Form.Item>
                                                ))}
                                            </Col>
                                        </Row>
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 0,
                                            width: '100%',
                                            borderTop: '1px solid #e9e9e9',
                                            padding: '10px 16px',
                                            background: '#fff',
                                            textAlign: 'right',
                                        }}>
                                        <Button onClick={this.hide} style={{ marginRight: 8 }}>
                                            取消
                                        </Button>
                                        <Button onClick={this.onSubmit} type='primary'>
                                            确认
                                        </Button>
                                    </div>
                                </Drawer>
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='info'>
                            <p>住户编号：{data.proprietor.id}</p>
                            <p>联系电话：{data.proprietor.phone}</p>
                            <p>住户姓名：{data.proprietor.realName}</p>
                            <p>房屋编号：{data.proprietor.houseNumber}</p>
                            <div>
                                <p>联系地址：{data.proprietor.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='blo'>
                    <h2>车位信息</h2>
                    <div className='line'></div>
                    <div className='info'>
                        <p>车位编号：{data.carport.id}</p>
                        <p>使用时间：{data.carport.stopDate[0]}</p>
                        <p>停用时间：{data.carport.stopDate[1]}</p>
                        <p>状态：{data.carport.status}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserInfo;
