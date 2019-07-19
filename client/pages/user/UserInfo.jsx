import React, { Component } from 'react';
import PropType from 'prop-types';
import { Drawer, Form, Button, Col, Row, Icon, Modal, Input, Select } from 'antd';

import { _list, _edit } from '@/api/user/UserInfo.js';
import '@/styles/pages/user/UserInfo.less';

export class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: '',
            realName: '',
            username: '',
            phone: '',
            houseNumber: '',
            address: '',
            infoId: '',
            startDate: '',
            endDate: '',
            status: '',
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
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    onChange = () => {
        const state = this.state;

        let data = {
            permission: state.permission,
            realName: state.realName,
            username: state.username,
            phone: state.phone,
            houseNumber: state.houseNumber,
            address: state.address,
            infoId: state.infoId,
            startDate: state.startDate,
            endDate: state.endDate,
            status: state.status,
        };

        console.log(data);
    }

    onChangeInfo = (name, key, e) => {
        let userForm = this.state.data;
        userForm[name] = e.target.value;
        this.setState({
            data: userForm
        });
        console.log(userForm);
    };

    show = () => {
        this.setState({
            visibleAccount: true,
        });
    };
    showDrawer = () => {
        this.setState({
            visibleInfo: true,
        });
    };
    hide = () => {
        this.setState({
            visibleAccount: false,
            visibleInfo: false,
        });
    };

    onSubmit = () => {
        this.hide();
        this.onChange();
    }

    componentDidMount() {
        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        let context = data ? data : result.data;
        console.log(context);
        this.setState({
            permission: context.account.permission,
            realName: context.account.realName,
            username: context.account.username,
            phone: context.proprietor.phone,
            houseNumber: context.proprietor.houseNumber,
            address: context.proprietor.address,
            infoId: context.proprietor.id,
            startDate: context.carport.stopDate[0],
            endDate: context.carport.stopDate[1],
            status: context.carport.status,
        });
    }

    render() {

        const {
            form, visibleAccount,permission, realName,
            username, phone, houseNumber, address, startDate,
            infoId, status, endDate,
        } = this.state;
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
                                    visible={visibleAccount}
                                    onOk={this.onSubmit}
                                    onCancel={this.hide}
                                    okText='确认'
                                    cancelText='取消'>

                                    <p>账号密码：</p>
                                    <Input
                                        placeholder={'请设置密码'}
                                        onChange={this.onChangePassword}
                                        form={[
                                            {
                                                text: '联系电话',
                                                name: 'phone',
                                                placeholder: '请填写联系电话',
                                                value: phone,
                                            },
                                            {
                                                text: '住户姓名',
                                                name: 'name',
                                                placeholder: '请填写住户姓名',
                                                value: realName,
                                            },
                                            {
                                                text: '房屋编号',
                                                name: 'house',
                                                placeholder: '请填写房屋编号',
                                                value: houseNumber,
                                            },
                                            {
                                                text: '联系地址',
                                                name: 'address',
                                                placeholder: '请填写联系地址',
                                                value: address,
                                            },
                                        ]}
                                    />
                                </Modal>
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='info'>
                            <p>账号编号：{username}</p>
                            <p>住户姓名：{realName}</p>
                            <p>权限：{permission}</p>
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
                                    visible={this.state.visibleInfo}>
                                    <div>
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                {form.map((item, index) => (
                                                    <Form.Item label={item.text} key={index}>
                                                        <Input
                                                            placeholder={item.placeholder}
                                                            defaultValue={item.value}
                                                            onChange={this.onChangeInfo.bind(this, item.name, index)}
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
                            <p>住户编号：{infoId}</p>
                            <p>联系电话：{phone}</p>
                            <p>住户姓名：{realName}</p>
                            <p>房屋编号：{houseNumber}</p>
                            <div>
                                <p>联系地址：{address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='blo'>
                    <h2>车位信息</h2>
                    <div className='line'></div>
                    <div className='info'>
                        {/* <p>车位编号：{accountId}</p> */}
                        <p>使用时间：{startDate}</p>
                        <p>停用时间：{endDate}</p>
                        <p>状态：{status}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserInfo;
