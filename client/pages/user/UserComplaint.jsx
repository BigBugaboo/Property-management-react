import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, message, Button } from 'antd';

import { _add, _list, _search, _edit } from '@/api/user/UserComplaint.js';
import '@/styles/pages/user/UserComplaint.less';
import Search from '@/components/common/Search';
import DrawerForm from '@/components/common/DrawerForm';


export class UserComplaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            form: [
                {
                    type: 'textArea',
                    text: '投诉内容',
                    name: 'summary',
                    placeholder: '请输入你想要投诉的信息',
                    value: '',
                },
            ],
            search: [
                {
                    type: 'date',
                    title: '投诉日期',
                    placeholder: '请输入投诉日期',
                    name: 'date'
                }
            ],
        };
    }

    onSearch = (e) => {
        _search(e)
            .then((response) => {
                this.reloadList(response.data);
            });
    }

    onChange = async (record, e) => {
        let data = {
            id: record.id,
            ...e
        };
        console.log(data);
        await _edit(data);

        this.reloadList();
    };

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

    onAdd = async  (e) => {
        await _add(e);
        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        if (result.code === 403) {
            this.props.history.push('/403');
            message.error(result.msg);
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

    render() {
        const { search, form, data, isLoading } = this.state;
        return (
            <div id='complaint'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <h2>投诉信息</h2>
                    <div className='line'></div>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        onSubmit={this.onAdd}
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='投诉编号' dataIndex='key' key='key' />
                        <Table.Column title='投诉日期' dataIndex='complaintDate' key='complaintDate' />
                        <Table.Column title='投诉内容' dataIndex='summary' key='summary' />
                        <Table.Column title='处理日期' dataIndex='dealDate' key='dealDate' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            key='action'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.dealDate === null &&
                                        <DrawerForm
                                            btnText='修改'
                                            btnIcon='edit'
                                            btnType='primary'
                                            onSubmit={this.onChange.bind(this, record)}
                                            form={[
                                                {
                                                    type: 'textArea',
                                                    text: '投诉内容',
                                                    name: 'summary',
                                                    placeholder: '请输入你想要投诉的信息',
                                                    value: record.summary,
                                                },
                                            ]}
                                        />}

                                </Button.Group>
                            )}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}
export default UserComplaint;
