import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, Icon, Modal } from 'antd';

import '@/styles/pages/user/UserPayment.less';
import Search from '@/components/common/Search';
import DrawerForm from '@/components/common/DrawerForm';


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
                    type: 'date',
                    title: '缴费日期',
                    placeholder: '请输入缴费日期',
                    name: 'date'
                }
            ],
        };
    }

    onSearch = (e) => {
        console.log(e);
    }

    onPay = (record, e) => {
        console.log(record);
        Modal.confirm({
            title: '是否确认缴费?',
            content: '确认后，无法恢复！',
            okText: '缴费',
            okType: 'primary',
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
        const { search } = this.state;
        return (
            <div id='Payment'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <h2>缴费信息</h2>
                    <div className='line'></div>
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='缴费编号' dataIndex='key' key='key' />
                        <Table.Column title='缴费日期' dataIndex='date' key='date' />
                        <Table.Column title='缴费项目' dataIndex='name' key='name' />
                        <Table.Column title='缴费总额' dataIndex='money' key='money' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            key='action'
                            render={(text, record) => (
                                <Button.Group>
                                    { record.status == '未缴费' &&
                                    <Button type='primary' onClick={this.onPay.bind(this, record)}>
                                        缴费
                                    </Button>}
                                </Button.Group>
                            )}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}
export default UserPayment;
