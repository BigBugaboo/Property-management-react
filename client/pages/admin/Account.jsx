import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Button, Collapse } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';
import '@/styles/pages/admin/account.scss';

const data = [
    {
        key: '1',
        username: '2016030403104',
        name: 'John Brown',
        password: '123',
        level: '业主',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        username: '2016030403104',
        name: 'Jim Green',
        password: '123',
        level: '业主',
        address: 'London No. 1 Lake Park',
        state: 'wait',
    },
    {
        key: '3',
        username: '2016030403104',
        name: 'Joe Black',
        password: '123',
        level: '业主',
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        username: '2016030403104',
        name: 'Joe Black',
        password: '123',
        level: '业主',
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
                    title: '账号编号',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: '密码',
                    dataIndex: 'password',
                    key: 'password',
                },
                {
                    title: '住户姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: '权限',
                    dataIndex: 'level',
                    key: 'level',
                },
                {
                    title: '操作',
                    key: '操作',

                },
            ]
        };
    }

    static propTypes = {

    }

    render() {
        const { columns, form } = this.state;

        return (
            <div id='account'>
                <Collapse className='search' defaultActiveKey={['1']}>
                    <Collapse.Panel header='筛选条件' key='1'>
                        <div className='search-group'>
                            <Input className='group-item' addonBefore='账号编号' defaultValue='' placeholder='请输入业主编号' />
                            <Button type='primary' >
                                搜索
                            </Button>
                        </div>
                    </Collapse.Panel>
                </Collapse>
                <div className='container'>
                    <DrawerForm title='添加' form={form} />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='账号编号' dataIndex='username' key='username' />
                        <Table.Column title='密码' dataIndex='password' key='password' />
                        <Table.Column title='住户姓名' dataIndex='name' key='name' />
                        <Table.Column title='地址' dataIndex='address' key='address' />
                        <Table.Column title='权限' dataIndex='level' key='level' />
                        <Table.Column
                            title='Action'
                            key='action'
                            render={(text, record) => (
                                <Button.Group>
                                    <Button type='primary'>
                                        <Icon type='edit' />
                                        修改
                                    </Button>
                                    <Button type='danger'>
                                        删除
                                        <Icon type='delete' />
                                    </Button>
                                </Button.Group>
                            )}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}

export default Account;
