import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button } from 'antd';

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
                            <p>账号信息</p>
                            <Button type='primary'>修改</Button>
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
                            <p>住户信息</p>
                            <Button type='primary'>修改</Button>
                        </div>
                        <div className='line'></div>
                        <div className='info'>
                            <p>账号编号：{nameid}</p>
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
                    <p>车位信息</p>
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
