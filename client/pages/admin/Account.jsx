import React, { Component } from 'react';
import { Table, Icon, Button, Modal } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';
import '@/styles/pages/admin/account.scss';

const data = [
    {
        key: '1',
        username: '2016030403104',
        name: 'John Brown',
        password: '123',
        level: '业主',
    },
    {
        key: '2',
        username: '2016030403104',
        name: 'Jim Green',
        password: '123',
        level: '业主',
        state: 'wait',
    },
    {
        key: '3',
        username: '2016030403104',
        name: 'Joe Black',
        password: '123',
        level: '业主',
    },
    {
        key: '4',
        username: '2016030403104',
        name: 'Joe Black',
        password: '123',
        level: '业主',
    },
];

/** 账号管理 */
export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'input',
                    text: '密码',
                    name: 'password',
                    placeholder: '请输入密码',
                    value: '',
                },
                {
                    type: 'input',
                    text: '住户姓名',
                    name: 'name',
                    placeholder: '请输入住户姓名',
                    value: '',
                },
                {
                    type: 'select',
                    text: '权限',
                    name: 'level',
                    placeholder: '请输入选择权限',
                    value: '',
                    option: [
                        {
                            value: '业主',
                            text: '业主',
                        },
                        {
                            value: '管理员',
                            text: '管理员',
                        },
                    ]
                },
            ],
            search: [
                {
                    type: 'input',
                    title: '住户姓名',
                    placeholder: '请输入住户姓名',
                    name: 'name'
                }
            ]
        };
    }

    onSearch = (e) => {
        console.log(e);
    }

    onDelete = (record, e) => {
        Modal.confirm({
            title: '是否删除该条信息?',
            content: '删除后，无法恢复！',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onChange = (e) => {
        console.log(e);
    };

    render() {
        const { search, form } = this.state;

        return (
            <div id='account'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='container'>
                    <h2>基本设置</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='住户编号' dataIndex='username' key='username' />
                        <Table.Column title='密码' dataIndex='password' key='password' />
                        <Table.Column title='住户姓名' dataIndex='name' key='name' />
                        <Table.Column title='权限' dataIndex='level' key='level' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    <DrawerForm
                                        btnText='修改'
                                        btnIcon='edit'
                                        btnType='primary'
                                        onSubmit={this.onChange}
                                        form={[
                                            {
                                                type: 'input',
                                                text: '密码',
                                                name: 'password',
                                                placeholder: '请输入密码',
                                                value: record.password,
                                            },
                                            {
                                                type: 'input',
                                                text: '住户姓名',
                                                name: 'name',
                                                placeholder: '请输入住户姓名',
                                                value: record.name,
                                            },
                                            {
                                                type: 'select',
                                                text: '权限',
                                                name: 'level',
                                                placeholder: '请输入选择权限',
                                                value: record.level,
                                                option: [
                                                    {
                                                        value: '业主',
                                                        text: '业主',
                                                    },
                                                    {
                                                        value: '管理员',
                                                        text: '管理员',
                                                    },
                                                ]
                                            },
                                        ]}
                                    />
                                    <Button type='danger' onClick={this.onDelete.bind(this, record)}>
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
