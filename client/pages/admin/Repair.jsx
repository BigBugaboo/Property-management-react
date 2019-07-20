import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Modal, message } from 'antd';

import { _edit, _search, _list, _delete } from '@/api/admin/repair.js';
import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

/** 投诉管理 */
export class Repair extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            search: [
                {
                    type: 'input',
                    title: '住户编号',
                    placeholder: '请输入住户编号',
                    name: 'id'
                },
                {
                    type: 'date',
                    title: '报修日期',
                    placeholder: '请输入报修日期',
                    name: 'data'
                },
                {
                    type: 'input',
                    title: '状态',
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
        this.onshow();
        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        if (result.code === 403) {
            this.props.history.push('/403');
            message.error('缺少权限');
            return null;
        }
        let list = data ? data : result.data.list;
        list = list.map((item, index) => {
            return {
                key: index,
                ...item
            };
        });
        if (list.length > 0) {
            this.setState({
                data: list
            });
        }
        this.onhide();
    }

    deleteItem = async (id) => {
        let data = {
            id: id
        };
        let result = await _delete(data);
        if (result.msg === 'success') {
            message.success('删除成功');
        }
        else {
            message.error('删除失败');
        }
        this.reloadList();
    }

    onSearch = (e) => {
        _search(e)
            .then((result) => {
                this.reloadList(result.data.list);
            });
    }

    onDelete = (record, e) => {
        const that = this;
        Modal.confirm({
            title: '是否删除该条信息?',
            content: '删除后，无法恢复！',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteItem(record.id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onChange = async (e, data) => {
        let require = {
            id: e.id,
            summary: data.summary ? data.summary : e.summary,
            serviceman: data.serviceman ? data.serviceman : e.serviceman,
            address: data.address ? data.address : e.address,
            status: data.status ? data.status : e.status,
        };
        await _edit(require);
        this.reloadList();
    };

    render() {
        const { search, data, isLoading } = this.state;

        return (
            <div id='account'>
                <div style={{ marginBottom: 16, backgroundColor: '#fff' }}>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div style={{ padding: 16, backgroundColor: '#fff' }}>
                    <h2>报修管理</h2>
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='proprietorId' key='proprietorId' />
                        <Table.Column title='报修日期' dataIndex='repairDate' key='repairDate' />
                        <Table.Column title='地址' dataIndex='address' key='address' />
                        <Table.Column title='维修内容' dataIndex='summary' key='summary' />
                        <Table.Column title='维修人员' dataIndex='serviceman' key='serviceman' />
                        <Table.Column title='维修日期' dataIndex='serviceDate' key='serviceDate' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.state !== '已处理' &&
                                        <DrawerForm
                                            btnText='修改'
                                            btnIcon='edit'
                                            btnType='primary'
                                            onSubmit={this.onChange.bind(this, record)}
                                            form={[
                                                {
                                                    type: 'textArea',
                                                    text: '内容',
                                                    name: 'summary',
                                                    placeholder: '请输入内容',
                                                    value: record.summary,
                                                },
                                                {
                                                    type: 'input',
                                                    text: '维修人员',
                                                    name: 'serviceman',
                                                    placeholder: '请输入维修人员',
                                                    value: record.serviceman,
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
                                                    name: 'status',
                                                    placeholder: '请输入状态',
                                                    value: record.status,
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
