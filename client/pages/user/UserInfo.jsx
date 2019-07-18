import React, { Component } from 'react';
import PropType from 'prop-types';
import { Drawer, Form, Button, Col, Row, Icon, Modal, Input, Select } from 'antd';

import '@/styles/pages/user/UserInfo.less';

const data = {
    'userid': 'user',
    'password': '123456',
    'name': '小王',
    'purview': '业主',
    'nameid': 1,
    'phone': 12345632165,
    'house': '01',
    'address': '  xx省xx市xx区x栋x单元x室',
    'carid': '001',
    'startTime': '2016-5-6',
    'stopTime': '2020-5-6',
    'status': '停车中',
};

export class UserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data,
            form: [
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
        console.log(data);
    };
    onChangeB = (name, key, e) => {
        let userForm = this.state.data;
        userForm[name] = e.target.value;
        this.setState({
            data: userForm
        });
        console.log(data);
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

    render() {
        const { form, data } = this.state;

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
                                    />
                                </Modal>
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='info'>
                            <p>账号编号：{data.userid}</p>
                            <p>账号密码：{data.password}</p>
                            <p>住户姓名：{data.name}</p>
                            <p>权限：{data.purview}</p>
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
                            <p>住户编号：{data.nameid}</p>
                            <p>联系电话：{data.phone}</p>
                            <p>住户姓名：{data.name}</p>
                            <p>房屋编号：{data.house}</p>
                            <div>
                                <p>联系地址：{data.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='blo'>
                    <h2>车位信息</h2>
                    <div className='line'></div>
                    <div className='info'>
                        <p>车位编号：{data.carid}</p>
                        <p>使用时间：{data.startTime}</p>
                        <p>停用时间：{data.stopTime}</p>
                        <p>状态：{data.status}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserInfo;
