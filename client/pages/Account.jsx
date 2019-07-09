import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Popconfirm, Divider, Tag, Form } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';

const data = [
    {
        key: '1',
        name: 'John Brown',
        number: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        number: 42,
        address: 'London No. 1 Lake Park',
        state: 'wait',
    },
    {
        key: '3',
        name: 'Joe Black',
        number: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

/** 账号管理 */
export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    name: '姓名',
                    placeholder: '请输入房屋拥有者姓名'
                },
                {
                    name: '现居人数',
                    placeholder: '请输入房屋现居人数'
                },
                {
                    name: '地址',
                    placeholder: '请输入房屋地址'
                },
            ],
            columns: [
                {
                    title: '住户名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '现居人数',
                    dataIndex: 'number',
                    key: 'number',
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type='primary' >修改</Button>
                            <Divider type='vertical' />
                            <Button type='danger' >删除</Button>
                        </span>
                    ),
                },
            ]
        };
    }

    static propTypes = {

    }

    render() {
        const { columns,form } = this.state;

        return (
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <DrawerForm title='添加' form={form} />
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        );
    }
}

export default Account;
