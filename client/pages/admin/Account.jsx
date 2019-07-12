import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            search: [
                {
                    title: '账号编号',
                    placeholder: '请输入业主编号',
                    name: 'username'
                }
            ]
        };
    }

    static propTypes = {

    }

    onSearch = (e) => {
        console.log(e);
    }

    onDelete = (record, e) => {
        console.log(record);
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

    render() {
        const { search, form } = this.state;

        return (
            <div id='account'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
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
