import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Modal } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

const data = [
    {
        key: '1',
        residentKey: '2016030403104',
        context: '123',
        startDate: 'John Brown',
        endDate: '业主',
        address: 'New York No. 1 Lake Park',
        name: '张三',
        state: '未处理',
    },
    {
        key: '2',
        residentKey: '2016030403104',
        context: '123',
        startDate: 'Jim Green',
        endDate: '业主',
        address: 'London No. 1 Lake Park',
        name: '张三',
        state: '未处理',
    },
    {
        key: '3',
        residentKey: '2016030403104',
        context: '123',
        startDate: 'Joe Black',
        endDate: '业主',
        address: 'Sidney No. 1 Lake Park',
        name: '张三',
        state: '未处理',
    },
    {
        key: '4',
        residentKey: '2016030403104',
        startDate: 'Joe Black',
        context: '123',
        endDate: '业主',
        address: 'Sidney No. 1 Lake Park',
        name: '张三',
        state: '已处理',
    },
];

/** 投诉管理 */
export class Repair extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: [
                {
                    type: 'input',
                    title: '住户编号',
                    placeholder: '请输入住户编号',
                    name: 'residentKey'
                },
                {
                    type: 'date',
                    title: '报修日期',
                    placeholder: '请输入报修日期',
                    name: 'startDate'
                },
                {
                    type: 'input',
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
                    <h2>报修管理</h2>
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='报销编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='residentKey' key='residentKey' />
                        <Table.Column title='报修日期' dataIndex='startDate' key='startDate' />
                        <Table.Column title='地址' dataIndex='address' key='address' />
                        <Table.Column title='维修内容' dataIndex='context' key='context' />
                        <Table.Column title='维修人员' dataIndex='name' key='name' />
                        <Table.Column title='维修日期' dataIndex='endDate' key='endDate' />
                        <Table.Column title='状态' dataIndex='state' key='state' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.state !== '已处理' &&
                                        <DrawerForm
                                            btnText='修改'
                                            btnIcon='edit'
                                            btnType='primary'
                                            onSubmit={this.onChange}
                                            form={[
                                                {
                                                    type: 'textArea',
                                                    text: '内容',
                                                    name: 'context',
                                                    placeholder: '请输入内容',
                                                    value: record.context,
                                                },
                                                {
                                                    type: 'input',
                                                    text: '维修人员',
                                                    name: 'name',
                                                    placeholder: '请输入维修人员',
                                                    value: record.name,
                                                },
                                                {
                                                    type: 'input',
                                                    text: '地址',
                                                    name: 'address',
                                                    placeholder: '请输入房屋地址',
                                                    value: record.address,
                                                },
                                                {
                                                    type: 'select',
                                                    text: '状态',
                                                    name: 'state',
                                                    placeholder: '请输入状态',
                                                    value: record.state,
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
                                            ]}
                                        />
                                    }
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

export default Repair;
