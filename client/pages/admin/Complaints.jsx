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
        state: '未处理',
    },
    {
        key: '2',
        residentKey: '2016030403104',
        context: '123',
        startDate: 'Jim Green',
        endDate: '业主',
        address: 'London No. 1 Lake Park',
        state: '未处理',
    },
    {
        key: '3',
        residentKey: '2016030403104',
        context: '123',
        startDate: 'Joe Black',
        endDate: '业主',
        address: 'Sidney No. 1 Lake Park',
        state: '未处理',
    },
    {
        key: '4',
        residentKey: '2016030403104',
        startDate: 'Joe Black',
        context: '123',
        endDate: '业主',
        address: 'Sidney No. 1 Lake Park',
        state: '未处理',
    },
];

/** 投诉管理 */
export class Complaints extends Component {

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
                    title: '投诉日期',
                    placeholder: '请输入投诉日期',
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
        const { search } = this.state;

        return (
            <div id='account'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='container'>
                    <h2>投诉管理</h2>
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='投诉编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='residentKey' key='residentKey' />
                        <Table.Column title='投诉日期' dataIndex='startDate' key='startDate' />
                        <Table.Column title='投诉内容' dataIndex='context' key='context' />
                        <Table.Column title='处理日期' dataIndex='endDate' key='endDate' />
                        <Table.Column title='地址' dataIndex='address' key='address' />
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
                                                text: '地址',
                                                name: 'address',
                                                placeholder: '请输入房屋地址',
                                                value: record.address,
                                            },
                                            {
                                                type: 'select',
                                                text: '状态',
                                                name: 'state',
                                                placeholder: '请输入选择权限',
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

export default Complaints;
