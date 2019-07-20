import React, { Component } from 'react';
import { Table, Icon, Button, Modal, message } from 'antd';

import { _add, _delete, _list, _search, _edit } from '@/api/admin/resident.js';
import DrawerForm from '@/components/common/DrawerForm';
import Search from '@/components/common/Search';

/** 住户管理 */
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            form: [
                {
                    type: 'input',
                    text: '账号',
                    name: 'account',
                    placeholder: '请输入对应的账号',
                    value: '',
                },
                {
                    type: 'input',
                    text: '住户姓名',
                    name: 'realName',
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
                    name: 'houseNumber',
                    value: '',
                },
            ],
            search: [
                {
                    type: 'input',
                    title: '住户姓名',
                    placeholder: '请输入住户姓名',
                    name: 'keyword'
                }
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
        let list = data ? data : result.data;
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
            .then((reponse) => {
                this.reloadList(reponse.data);
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

    onChange = async (record, e) => {
        this.onshow();
        let require = {
            id: record.id,
            realName: e.realName ? e.realName : record.realName,
            phone: e.phone ? e.phone : record.phone,
            address: e.address ? e.address : record.address,
            houseNumber: e.houseNumber ? e.houseNumber : record.houseNumber,
        };

        let result = await _edit(require);
        message.info(result.msg);
        this.reloadList();
    };

    onAdd = async (e) => {
        this.onshow();
        const data = {
            account: e.account,
            realName: e.realName,
            phone: e.phone,
            address: e.address,
            houseNumber: e.houseNumber,
        };

        let result = await _add(data);
        console.log(result);
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
        }
        this.reloadList();
    }

    render() {
        const { search, form, data, isLoading } = this.state;

        return (
            <div id='account'>
                <div style={{ marginBottom: 16, backgroundColor: '#fff' }}>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div style={{ padding: 16, backgroundColor: '#fff' }}>
                    <h2>住户管理</h2>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        onSubmit={this.onAdd}
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='编号' dataIndex='id' key='id' />
                        <Table.Column title='住户姓名' dataIndex='realName' key='realName' />
                        <Table.Column title='联系电话' dataIndex='phone' key='phone' />
                        <Table.Column title='联系地址' dataIndex='address' key='address' />
                        <Table.Column title='房屋编号' dataIndex='houseNumber' key='houseNumber' />
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
                                                type: 'input',
                                                text: '住户姓名',
                                                name: 'realName',
                                                placeholder: '请输入住户姓名',
                                                value: record.realName,
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
                                                name: 'houseNumber',
                                                value: record.houseNumber,
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
