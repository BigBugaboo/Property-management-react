import React, { Component } from 'react';
import { Table, Icon, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/counter';
import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

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

const mapStateToProps = (state, ownProps) => {
    return state.count;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'input',
                    text: '住户编号',
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
                    type: 'input',
                    text: '地址',
                    name: 'address',
                    placeholder: '请输入房屋地址',
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
                        <Table.Column title='住户编号' dataIndex='username' key='username' />
                        <Table.Column title='住户姓名' dataIndex='name' key='name' />
                        <Table.Column title='联系电话' dataIndex='phone' key='phone' />
                        <Table.Column title='联系地址' dataIndex='address' key='address' />
                        <Table.Column title='房屋编号' dataIndex='number' key='number' />
                        <Table.Column
                            title='Action'
                            key='action'
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
                                                name: 'address',
                                                placeholder: '请输入房屋地址',
                                                value: record.address,
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

export default Index;
