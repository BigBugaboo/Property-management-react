import React, { Component } from 'react';
import PropType from 'prop-types';
import { Drawer, Form, Button, Col, Row, Icon, Modal, Input, Select } from 'antd';

import '@/styles/pages/user/UserInfo.scss';

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
        this.state = data;
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            data: this.state.data
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
        // this.props.onSubmit(this.state.data);
        this.hide();
    }

    render() {
        const {
            userid, password, name, purview,
            nameid, phone, house, address,
            carid, startTime, stopTime, status
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
                                    title="修改账号信息"
                                    visible={this.state.visibleA}
                                    onOk={this.onSubmit}
                                    onCancel={this.hide}
                                    okText="确认"
                                    cancelText="取消">

                                    <p>账号密码：</p>
                                    <Input
                                        placeholder={'请设置密码'}
                                        defaultValue={password}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </Modal>
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='info'>
                            <p>账号编号：{userid}</p>
                            <p>账号密码：{password}</p>
                            <p>住户姓名：{name}</p>
                            <p>权限：{purview}</p>
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
                                                <Form.Item label={'联系电话'} >
                                                    <Input
                                                        placeholder={'请填写联系电话'}
                                                        defaultValue={phone}
                                                        onChange={this.onChange.bind(this)}
                                                    />
                                                </Form.Item>
                                                <Form.Item label={'住户姓名'} >
                                                    <Input
                                                        placeholder={'请填写住户姓名'}
                                                        defaultValue={name}
                                                        onChange={this.onChange.bind(this)}
                                                    />
                                                </Form.Item>
                                                <Form.Item label={'房屋编号'} >
                                                    {/* <Input
                                                        placeholder={'请填写房屋编号'}
                                                        defaultValue={house}
                                                        onChange={this.onChange.bind(this)}
                                                    /> */}
                                                    <Select
                                                        style={{ width: 200 }}
                                                        defaultValue={house}
                                                        onChange={this.onChange.bind(this)}>
                                                        <Select.Option key={house}
                                                            value={house}>{house}
                                                        </Select.Option>
                                                        <Select.Option key={house}
                                                            value={'08'}>{'08'}
                                                        </Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label={'联系地址'} >
                                                    <Input
                                                        placeholder={'请填写联系地址'}
                                                        defaultValue={address}
                                                        onChange={this.onChange.bind(this)}
                                                    />
                                                </Form.Item>
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
                            <p>住户编号：{nameid}</p>
                            <p>联系电话：{phone}</p>
                            <p>住户姓名：{name}</p>
                            <p>房屋编号：{house}</p>
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
                        <p>车位编号：{carid}</p>
                        <p>使用时间：{startTime}</p>
                        <p>停用时间：{stopTime}</p>
                        <p>状态：{status}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserInfo;
