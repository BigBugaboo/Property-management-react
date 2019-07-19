import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button, Icon, Modal } from 'antd';

import { _list, _search } from '@/api/user/UserPayment.js';
import '@/styles/pages/user/UserPayment.less';
import Search from '@/components/common/Search';
import DrawerForm from '@/components/common/DrawerForm';

export class UserPayment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
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

    onhide = () => {
        this.setState({
            isLoading: false
        });
    }
    onshow = () => {
        this.setState({
            isLoading: true
        });
    }

    componentDidMount() {
        this.onshow();
        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        let list = data ? data : result.data;
        list = list.map((item, index) => {
            return {
                key: index,
                ...item
            };
        });
        console.log(list);
        if (list.length > 0) {
            this.setState({
                data: list
            });
        }
        this.onhide();
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
        const { search, data, isLoading } = this.state;
        return (
            <div id='Payment'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <h2>缴费信息</h2>
                    <div className='line'></div>
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='缴费编号' dataIndex='key' key='key' />
                        <Table.Column title='缴费日期' dataIndex='costDate' key='costDate' />
                        <Table.Column title='缴费项目' dataIndex='item' key='item' />
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
