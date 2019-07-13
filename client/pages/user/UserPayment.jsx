import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, Input, Collapse, Icon } from 'antd';

import '@/styles/pages/user/UserPayment.scss';
import Search from '@/components/common/Search';

const data = [
    {
        key: '1',
        date: '2019-6-12',
        name: '物业费',
        money: '520元',
        status: '未缴费'
    },
    {
        key: '2',
        date: '2019-6-12',
        name: '物业费',
        money: '520元',
        status: '已缴费'
    },
    {
        key: '3',
        date: '2019-6-12',
        name: '物业费',
        money: '520元',
        status: '已缴费'
    },
    {
        key: '4',
        date: '2019-6-12',
        name: '物业费',
        money: '520元',
        status: '未缴费'
    },
    {
        key: '5',
        date: '2019-6-12',
        name: '物业费',
        money: '520元',
        status: '已缴费'
    },
];

export class UserPayment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search: [
                {
                    title: '缴费日期',
                    placeholder: '请输入缴费日期',
                    name: 'date'
                }
            ],
            columns: [
                {
                    title: '缴费编号',
                    dataIndex: 'key',
                    key: 'key',
                },
                {
                    title: '缴费日期',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: '缴费项目',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '缴费总额',
                    dataIndex: 'money',
                    key: 'money',
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
                            <Button type='primary' className='btn'>缴费</Button>
                        </span>
                    ),
                },
            ]
        };
    }

    onSearch = (e) => {
        console.log(e);
    }

    render() {
        const { columns, search } = this.state;
        return (
            <div id='Payment'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <p>缴费信息</p>
                    <div className='line'></div>
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        );
    }
}
export default UserPayment;
