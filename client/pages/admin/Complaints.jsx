import React, { Component } from 'react';
import { Table, Icon, Button, Modal, message } from 'antd';

import { _edit, _search, _list } from '@/api/admin/complaints.js';
import Search from '@/components/common/Search';

/** 投诉管理 */
export class Complaints extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            search: [
                {
                    type: 'input',
                    title: '账号编号',
                    placeholder: '请输入账号编号',
                    name: 'proprietorId'
                },
                {
                    type: 'date',
                    title: '投诉日期',
                    placeholder: '请输入投诉日期',
                    name: 'date'
                },
                {
                    type: 'radio',
                    title: '状态',
                    list: [
                        '已处理',
                        '未处理',
                    ],
                    placeholder: '请输入状态',
                    name: 'status'
                },
            ]
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
        this.reloadList();
    }

    reloadList = async (data) => {
        this.onshow();
        let result = await _list();
        if (result.code === 403) {
            this.props.history.push('/403');
            message.error('缺少权限');
            return null;
        }
        let list = typeof data === 'object' ? data : result.data.list;
        list = list.map((item, index) => {
            return {
                key: index,
                ...item
            };
        });
        this.setState({
            data: list
        });
        this.onhide();
    }

    // deleteItem = async (id) => {
    //     let data = {
    //         id: id
    //     };
    //     let result = await _delete(data);
    //     if (result.msg === 'success') {
    //         message.success('删除成功');
    //     }
    //     else {
    //         message.error('删除失败');
    //     }
    //     this.reloadList();
    // }

    onSearch = (e) => {
        _search(e)
            .then((result) => {
                message.info(result.msg);
                this.reloadList(result.data.list);
            });
    }

    // onDelete = (record, e) => {
    //     const that = this;
    //     Modal.confirm({
    //         title: '是否删除该条信息?',
    //         content: '删除后，无法恢复！',
    //         okText: '删除',
    //         okType: 'danger',
    //         cancelText: '取消',
    //         onOk() {
    //             that.deleteItem(record.id);
    //         },
    //         onCancel() {
    //             console.log('Cancel');
    //         },
    //     });
    // }

    onChange = (record, e) => {
        const that = this;
        Modal.confirm({
            title: '是否已经处理该投诉?',
            content: '确认后，无法修改！',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                _edit(record)
                    .then((result) => {
                        message.info(result.msg);
                        that.reloadList();
                    });
            }
        });
    };

    render() {
        const { search, isLoading, data } = this.state;

        return (
            <div id='account'>
                <div style={{ marginBottom: 16, backgroundColor: '#fff' }}>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div style={{ padding: 16, backgroundColor: '#fff' }}>
                    <h2>投诉管理</h2>
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='编号' dataIndex='id' key='id' />
                        <Table.Column title='账号编号' dataIndex='proprietorId' key='proprietorId' />
                        <Table.Column title='投诉日期' dataIndex='complaintDate' key='complaintDate' />
                        <Table.Column title='投诉内容' dataIndex='summary' key='summary' />
                        <Table.Column title='处理日期' dataIndex='dealDate' key='dealDate' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.status !== '已处理' &&
                                        <Button
                                            type='primary'
                                            onClick={this.onChange.bind(this, record)}>
                                            <Icon type='edit' />
                                            审核
                                        </Button>
                                    }
                                    {/* <Button type='danger' onClick={this.onDelete.bind(this, record)}>
                                        删除
                                        <Icon type='delete' />
                                    </Button> */}
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
