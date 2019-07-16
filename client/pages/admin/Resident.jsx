import React, { Component } from 'react';
import { Table, Icon, Button, Modal } from 'antd';

import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

const data = [
    {
        key: '1',
        name: 'John Brown',
        phone: '123',
        address: 'New York No. 1 Lake Park',
        number: '16-121',
    },
    {
        key: '2',
        name: 'Jim Green',
        phone: '123',
        address: 'London No. 1 Lake Park',
        number: '16-121',
        state: 'wait',
    },
    {
        key: '3',
        name: 'Joe Black',
        phone: '123',
        address: 'Sidney No. 1 Lake Park',
        number: '16-121',
    },
    {
        key: '4',
        name: 'Joe Black',
        phone: '123',
        address: 'Sidney No. 1 Lake Park',
        number: '16-121',
    },
];

/** 住户管理 */
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'input',
                    text: '住户姓名',
                    name: 'name',
                    placeholder: '请输入住户姓名',
                    value: '',
                },
                {
                    type: 'input',
                    text: '联系电话',
                    name: 'phone',
                    placeholder: '请输入联系电话',
                    value: '',
                },
                {
                    type: 'input',
                    text: '联系地址',
                    name: 'address',
                    placeholder: '请输入房屋地址',
                    value: '',
                },
                {
                    type: 'input',
                    text: '房屋编号',
                    placeholder: '请输入房屋编号',
                    name: 'number',
                    value: '',
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
                    <h2>住户管理</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='住户编号' dataIndex='key' key='key' />
                        <Table.Column title='住户姓名' dataIndex='name' key='name' />
                        <Table.Column title='联系电话' dataIndex='phone' key='phone' />
                        <Table.Column title='联系地址' dataIndex='address' key='address' />
                        <Table.Column title='房屋编号' dataIndex='number' key='number' />
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
                                                text: '住户姓名',
                                                name: 'name',
                                                placeholder: '请输入住户姓名',
                                                value: record.name,
                                            },
                                            {
                                                type: 'input',
                                                text: '联系电话',
                                                name: 'phone',
                                                placeholder: '请输入联系电话',
                                                value: record.phone,
                                            },
                                            {
                                                type: 'input',
                                                text: '联系地址',
                                                name: 'address',
                                                placeholder: '请输入房屋地址',
                                                value: record.address,
                                            },
                                            {
                                                type: 'input',
                                                text: '房屋编号',
                                                placeholder: '请输入房屋编号',
                                                name: 'number',
                                                value: record.number,
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

export default Index;
