import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Icon, Modal, Input, message, notification } from 'antd';

import { _list, _passwordedit, _edit } from '@/api/user/UserInfo.js';
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
            id: '',
            form: [
                {
                    text: '联系电话',
                    name: 'phone',
                    placeholder: '请填写联系电话',
                    value: '',
                },
                {
                    text: '住户姓名',
                    name: 'realName',
                    placeholder: '请填写住户姓名',
                    value: '',
                },
                {
                    text: '房屋编号',
                    name: 'houseNumber',
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

    onSubmitPassword = () => {
        const state = this.state;
        this.hide();

        let data = {
            password: state.password,
        };
        _passwordedit(data)
            .then((result) => {
                if (result.code === 200) {
                    message.success(result.msg);
                    this.props.history.push('/');
                    window.sessionStorage.removeItem('Token');
                    notification['warn']({
                        message: '重置密码',
                        description: '请重新登录',
                    });
                }
                else {
                    message.error('修改失败');
                }
            });
    }

    onChangeInfo = (name, e) => {
        let user = this.state;
        user[name] = e.target.value;
    };

    onSubmit = () => {
        const state = this.state;
        this.hide();

        let data = {
            name: state.realName,
            phone: state.phone,
            number: state.houseNumber,
            address: state.address,
        };
        _edit(data)
            .then((result) => {
                message.info(result.msg);
            });
    }

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

    componentDidMount() {
        this.reloadList();
    }

    reloadList = async () => {
        let result = await _list();
        if (result.code === 403) {
            this.props.history.push('/403');
            message.error('缺少权限');
            return null;
        }
        let context = result.data;
        const startDate = context.carport.stopDate ? context.carport.stopDate[0] : '无';
        const endDate = context.carport.stopDate ? context.carport.stopDate[1] : '无';
        const permission = context.account.permission === 2 ? '业主' : '管理员';
        this.setState({
            permission: permission,
            realName: context.account.realName || '无',
            username: context.account.username || '无',
            phone: context.proprietor.phone || '无',
            houseNumber: context.proprietor.houseNumber || '无',
            address: context.proprietor.address || '无',
            infoId: context.proprietor.id || '无',
            id: context.carport.id || '无',
            startDate: startDate,
            endDate: endDate,
            status: context.carport.status || '无',
            form: [
                {
                    text: '联系电话',
                    name: 'phone',
                    placeholder: '请填写联系电话',
                    value: context.proprietor.phone || '无',
                },
                {
                    text: '住户姓名',
                    name: 'realName',
                    placeholder: '请填写住户姓名',
                    value: context.account.realName || '无',
                },
                {
                    text: '房屋编号',
                    name: 'houseNumber',
                    placeholder: '请填写房屋编号',
                    value: context.proprietor.houseNumber || '无',
                },
                {
                    text: '联系地址',
                    name: 'address',
                    placeholder: '请填写联系地址',
                    value: context.proprietor.address || '无',
                },
            ]

        });
    }

    render() {

        const {
            form, visibleAccount, permission, realName, id,
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
                                    onOk={this.onSubmitPassword}
                                    onCancel={this.hide}
                                    okText='确认'
                                    cancelText='取消'>

                                    <p>账号密码：</p>
                                    <Input
                                        placeholder={'请设置密码'}
                                        onChange={this.onChangePassword}
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
                                                            onChange={this.onChangeInfo.bind(this, item.name)}
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
                        <p>车位编号：{id}</p>
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
