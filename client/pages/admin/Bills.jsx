import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Modal } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

const data = [
    {
        key: '1',
        residentKey: '2016030403104',
        sort: '123',
        endDate: 'John Brown',
        cost: '业主',
        address: 'New York No. 1 Lake Park',
        number: '无',
        state: '未处理',
    },
    {
        key: '2',
        residentKey: '2016030403104',
        sort: '123',
        endDate: 'Jim Green',
        cost: '业主',
        address: 'London No. 1 Lake Park',
        number: '无',
        state: '未处理',
    },
    {
        key: '3',
        residentKey: '2016030403104',
        sort: '123',
        endDate: 'Joe Black',
        cost: '业主',
        address: 'Sidney No. 1 Lake Park',
        number: '无',
        state: '未处理',
    },
    {
        key: '4',
        residentKey: '2016030403104',
        endDate: 'Joe Black',
        sort: '123',
        cost: '业主',
        address: 'Sidney No. 1 Lake Park',
        number: '无',
        state: '未处理',
    },
];

/** 投诉管理 */
export class Bills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'input',
                    text: '住户编号',
                    name: 'residentKey',
                    placeholder: '请输入住户编号',
                    value: '',
                },
                {
                    type: 'input',
                    text: '缴费总额',
                    name: 'cost',
                    placeholder: '请输入缴费总额',
                    value: '',
                },
                {
                    type: 'select',
                    text: '缴费项目',
                    name: 'sort',
                    placeholder: '请选择缴费项目',
                    value: '',
                    option: [
                        {
                            value: '水电费',
                            text: '水电费',
                        },
                        {
                            value: '停车费',
                            text: '停车费',
                        },
                        {
                            value: '物业费',
                            text: '物业费',
                        },
                    ]
                },
            ],
            search: [
                {
                    title: '住户编号',
                    placeholder: '请输入住户编号',
                    name: 'residentKey'
                },
                {
                    title: '收费项目',
                    placeholder: '请输入收费项目',
                    name: 'sort'
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
                    <h2>缴费管理</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='缴费编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='residentKey' key='residentKey' />
                        <Table.Column title='缴费日期' dataIndex='endDate' key='endDate' />
                        <Table.Column title='缴费项目' dataIndex='sort' key='sort' />
                        <Table.Column title='缴费总额' dataIndex='cost' key='cost' />
                        <Table.Column title='单号' dataIndex='number' key='number' />
                        <Table.Column title='状态' dataIndex='state' key='state' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    <Button
                                        type='primary'>
                                        <Icon type='edit' />
                                        审核
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

export default Bills;
