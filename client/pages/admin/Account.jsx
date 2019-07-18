import React, { Component } from 'react';
import { Table, Icon, Button, Modal, message } from 'antd';

import { _add, _delete, _list } from '@/api/admin/account.js';
import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';
import '@/styles/pages/admin/account.less';

/** 账号管理 */
export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            form: [
                {
                    type: 'input',
                    text: '账号',
                    name: 'username',
                    placeholder: '请输入账号',
                    value: '',
                },
                {
                    type: 'input',
                    text: '密码',
                    name: 'password',
                    placeholder: '请输入密码',
                    value: '',
                },
                {
                    type: 'select',
                    text: '权限',
                    name: 'roles',
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
        this.reloadList = this.reloadList.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.reloadList();
    }

    reloadList = async () => {
        let result = await _list();
        let data = result.data.map((item, index) => {
            return {
                key: index,
                ...item
            };
        });
        if (result.data) {
            this.setState({
                data: data
            });
        }
    }

    onSearch = (e) => {
        console.log(e);
    }

    onDelete = (record, e) => {
        const that = this;
        Modal.confirm({
            title: '是否删除该条信息?',
            content: '删除后，无法恢复！',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteItem(record.id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    deleteItem = async (id) => {
        let data = {
            id: id
        };
        let result = await _delete(data);
        if (result.msg === 'success') {
            message.success('删除成功');
        }
        else {
            message.error('删除失败');
        }
        this.reloadList();
    }

    onAdd = async (e) => {
        const data = {
            password: e.password,
            username: e.username,
            permission: e.roles
        };

        let result = await _add(data);
        console.log(result);
        if (result.code === -1) {
            message.error(result.msg);
        }
        else if (result.code === 400) {
            message.warn(result.msg);
        }
        else if (result.code === 403) {
            message.warn(result.msg);
        }
        else if (result.code === 200) {
            message.success(result.msg);
            this.reloadList();
        }
    }

    onChange = (e) => {
        console.log(e);
    };

    render() {
        const { search, form, data } = this.state;

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
                        onSubmit={this.onAdd}
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='id' key='id' />
                        <Table.Column title='账号' dataIndex='username' key='username' />
                        <Table.Column title='姓名' dataIndex='realName' key='realName' />
                        <Table.Column title='权限' dataIndex='roles' key='roles' />
                        <Table.Column title='创建日期' dataIndex='createDate' key='createDate' />
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
                                                name: 'roles',
                                                placeholder: '请输入选择权限',
                                                value: record.roles,
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
