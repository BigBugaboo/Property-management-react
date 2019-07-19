import React, { Component } from 'react';
import { Table, Icon, Button, Modal, message } from 'antd';

import { _add, _delete, _list, _search, _edit } from '@/api/admin/park.js';
import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

/** 投诉管理 */
export class Park extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            data: [],
            form: [
                {
                    type: 'input',
                    text: '住户编号',
                    name: 'proprietorId',
                    placeholder: '请输入住户编号',
                },
                {
                    type: 'input',
                    text: '车牌号',
                    name: 'carNum',
                    placeholder: '请选择车牌号',
                },
                {
                    type: 'input',
                    text: '租期天数(每天20元)',
                    name: 'days',
                    placeholder: '请选择租凭天数',
                },
            ],
            search: [
                {
                    type: 'input',
                    title: '住户编号',
                    placeholder: '请输入住户编号',
                    name: 'id'
                },
                {
                    type: 'input',
                    title: '车牌号',
                    placeholder: '请输入车牌号',
                    name: 'num'
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
                startDate: item.usePeriod[0],
                endDate: item.usePeriod[1],
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


    onhide = () => {
        this.setState({
            isloading: false
        });
    }
    onshow = () => {
        this.setState({
            isloading: true
        });
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
        let result = {
            id: e.id,
            status: data.status ? data.status : e.status
        };
        await _edit(result);

        this.reloadList();
    };

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

    render() {
        const { search, form, data, isloading } = this.state;

        return (
            <div id='account'>
                <div style={{ marginBottom: 16, backgroundColor: '#fff' }}>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div style={{ padding: 16, backgroundColor: '#fff' }}>
                    <h2>车位管理</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        onSubmit={this.onAdd}
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default' loading={isloading}>
                        <Table.Column title='编号' dataIndex='key' key='key' />
                        <Table.Column title='住户编号' dataIndex='proprietorId' key='proprietorId' />
                        <Table.Column title='车牌号' dataIndex='carNum' key='carNum' />
                        <Table.Column title='使用时间' dataIndex='startDate' key='startDate' />
                        <Table.Column title='停用时间' dataIndex='endDate' key='endDate' />
                        <Table.Column title='总额' dataIndex='amount' key='amount' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            render={(text, record) => (
                                <Button.Group>
                                    <DrawerForm
                                        btnText='修改'
                                        btnIcon='edit'
                                        btnType='primary'
                                        onSubmit={this.onChange.bind(this, record)}
                                        form={[
                                            {
                                                type: 'select',
                                                text: '状态',
                                                name: 'status',
                                                placeholder: '请输入选择权限',
                                                value: record.status,
                                                option: [
                                                    {
                                                        value: '停车中',
                                                        text: '停车中',
                                                    },
                                                    {
                                                        value: '空闲',
                                                        text: '空闲',
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

export default Park;
