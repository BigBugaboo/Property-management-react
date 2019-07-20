import React, { Component } from 'react';
import { Table, Icon, Button, Modal, message } from 'antd';

import { _add, _list, _search, _edit } from '@/api/admin/bills.js';
import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

/** 投诉管理 */
export class Bills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            form: [
                {
                    type: 'input',
                    text: '住户编号',
                    name: 'proprietorId',
                    placeholder: '请输入住户编号',
                    value: '',
                },
                {
                    type: 'input',
                    text: '缴费总额',
                    name: 'money',
                    placeholder: '请输入缴费总额',
                    value: '',
                },
                {
                    type: 'select',
                    text: '缴费项目',
                    name: 'item',
                    placeholder: '请选择缴费项目',
                    value: '',
                    option: [
                        {
                            value: '水费',
                            text: '水费',
                        },
                        {
                            value: '电费',
                            text: '电费',
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
                    type: 'input',
                    title: '住户编号',
                    placeholder: '请输入住户编号',
                    name: 'proprietorId'
                },
                {
                    type: 'input',
                    title: '收费项目',
                    placeholder: '请输入收费项目',
                    name: 'item'
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

    componentDidMount() {
        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        let list = data ? data : result.data.list;
        list = list.map((item, index) => {
            return {
                key: index,
                costDate: item.costDate,
                ...item
            };
        });
        if (list.length > 0) {
            this.setState({
                data: list
            });
            this.onhide();
        }
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

    onSearch = (e) => {
        _search(e)
            .then((result) => {
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

    onAdd = async (e) => {
        let result = await _add(e);
        if (result.code === -1) {
            message.error(result.msg);
        }
        else if (result.code === 400) {
            message.warn(result.msg);
        }
        else if (result.code === 403) {
            message.warn(result.msg);
        }
        else if (result.code === 200) {
            message.success(result.msg);
            this.reloadList();
        }
    }

    onChange = (record, e) => {
        let that = this;
        Modal.confirm({
            title: '是否确认通过该缴费?',
            content: '确认后，无法修改！',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                _edit(record)
                    .then((response) => {
                        that.reloadList();
                    });
            }
        });
    };

    render() {
        const { search, form, data, isLoading } = this.state;

        return (
            <div id='account'>
                <div style={{ marginBottom: 16, backgroundColor: '#fff' }}>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div style={{ padding: 16, backgroundColor: '#fff' }}>
                    <h2>缴费管理</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        onSubmit={this.onAdd}
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='proprietorId' key='proprietorId' />
                        <Table.Column title='缴费日期' dataIndex='costDate' key='costDate' />
                        <Table.Column title='缴费项目' dataIndex='item' key='item' />
                        <Table.Column title='缴费总额' dataIndex='money' key='money' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.status !== '已缴费' &&
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

export default Bills;
