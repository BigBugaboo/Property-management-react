import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, form } from 'antd';

import '@/styles/pages/user/UserComplaint.scss';
import UserAdd from '@/components/common/UserAdd';

const data = {
    complaint: [
        {
            key: '1',
            startdate: '2019-6-12',
            content: 'xxxxxxx',
            enddate: '',
            status: '未处理'
        },
        {
            key: '2',
            startdate: '2019-6-12',
            content: 'xxxxxxx',
            enddate: '2019-6-12',
            status: '已处理'
        },
        {
            key: '3',
            startdate: '2019-6-12',
            content: 'xxxxxxx',
            enddate: '2019-6-12',
            status: '已处理'
        },
        {
            key: '4',
            startdate: '2019-6-12',
            content: 'xxxxxxx',
            enddate: '2019-6-12',
            status: '已处理'
        },
        {
            key: '5',
            startdate: '2019-6-12',
            content: 'xxxxxxx',
            enddate: '2019-6-12',
            status: '已处理'
        },
    ],
};


export class UserComplaint extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    name: '投诉内容',
                    placeholder: '请输入你想要投诉的信息'
                },
            ],
            complaint: [
                {
                    title: '投诉编号',
                    dataIndex: 'key',
                    key: 'key',
                },
                {
                    title: '投诉日期',
                    dataIndex: 'startdate',
                    key: 'startdate',
                },
                {
                    title: '投诉内容',
                    dataIndex: 'content',
                    key: 'content',
                },
                {
                    title: '处理日期',
                    dataIndex: 'enddate',
                    key: 'enddate',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type='primary' className='btn'>修改</Button>
                        </span>
                    ),
                },
            ],
        };
    }

    render() {
        const { complaint, form } = this.state;
        return (
            <div id='complaint'>
                <p>投诉信息</p>
                <div className='line'></div>
                <UserAdd title='添加' form={form} />
                <Table
                    bordered={true}
                    columns={complaint}
                    dataSource={data.complaint}
                />
            </div>
        );
    }
}
export default UserComplaint;
