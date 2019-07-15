import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Modal } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

const data = [
    {
        key: '1',
        residentKey: '2016030403104',
        startDate: '123',
        license: 'John Brown',
        endDate: '业主',
        cost: 'New York No. 1 Lake Park',
        state: '未处理',
    },
    {
        key: '2',
        residentKey: '2016030403104',
        startDate: '123',
        license: 'Jim Green',
        endDate: '业主',
        cost: 'London No. 1 Lake Park',
        state: '未处理',
    },
    {
        key: '3',
        residentKey: '2016030403104',
        startDate: '123',
        license: 'Joe Black',
        endDate: '业主',
        cost: 'Sidney No. 1 Lake Park',
        state: '未处理',
    },
    {
        key: '4',
        residentKey: '2016030403104',
        license: 'Joe Black',
        startDate: '123',
        endDate: '业主',
        cost: 'Sidney No. 1 Lake Park',
        state: '未处理',
    },
];

/** 投诉管理 */
export class Park extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'textArea',
                    text: '投诉内容',
                    name: 'startDate',
                    placeholder: '请输入投诉内容',
                    value: '',
                },
                {
                    type: 'input',
                    text: '车牌号',
                    name: 'license',
                    placeholder: '请选择车牌号',
                    value: '',
                },
                {
                    type: 'input',
                    text: '处理日期',
                    name: 'endDate',
                    placeholder: '请选择处理日期',
                    value: '',
                },
                {
                    type: 'select',
                    text: '状态',
                    name: 'state',
                    placeholder: '请选择状态',
                    value: '',
                    option: [
                        {
                            value: '已处理',
                            text: '已处理',
                        },
                        {
                            value: '未处理',
                            text: '未处理',
                        },
                    ]
                },
            ],
            search: [
                {
                    title: '账号编号',
                    placeholder: '请输入账号编号',
                    name: 'residentKey'
                },
                {
                    title: '车牌号',
                    placeholder: '请输入车牌号',
                    name: 'license'
                },
                {
                    title: '状态',
                    placeholder: '请输入状态',
                    name: 'state'
                },
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
                    <h2>车位管理</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='车位编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='residentKey' key='residentKey' />
                        <Table.Column title='车牌号' dataIndex='license' key='license' />
                        <Table.Column title='使用时间' dataIndex='startDate' key='startDate' />
                        <Table.Column title='停用时间' dataIndex='endDate' key='endDate' />
                        <Table.Column title='总额' dataIndex='cost' key='cost' />
                        <Table.Column title='状态' dataIndex='state' key='state' />
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
                                                type: 'input',
                                                text: '地址',
                                                name: 'cost',
                                                placeholder: '请输入房屋地址',
                                                value: record.cost,
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

export default Park;
