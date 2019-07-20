import React, { Component } from 'react';
import { Table, message, Button, } from 'antd';

import { _add, _list, _search, _edit } from '@/api/user/UserRepair.js';
import '@/styles/pages/user/UserRepair.less';
import Search from '@/components/common/Search';
import DrawerForm from '@/components/common/DrawerForm';


export class UserRepair extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            form: [
                {
                    type: 'textArea',
                    text: '报修内容',
                    name: 'summary',
                    placeholder: '请输入你想要报修的信息',
                    value: '',
                },
            ],
            search: [
                {
                    type: 'input',
                    title: '报修内容',
                    placeholder: '请输入报修内容',
                    name: 'summary'
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
            summary: e.summary
        };
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

    onAdd = async (e) => {
        console.log(e);
        await _add(e);

        this.reloadList();
    }

    reloadList = async (data) => {
        let result = await _list();
        if (result.code === 403) {
            this.props.history.push('/403');
            message.error(result.msg);
        }
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

    render() {
        const { search, form, data, isLoading } = this.state;
        return (
            <div id='repair'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <h2>报修信息</h2>
                    <div className='line'></div>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        onSubmit={this.onAdd}
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='报修编号' dataIndex='key' key='key' />
                        <Table.Column title='报修日期' dataIndex='repairDate' key='repairDate' />
                        <Table.Column title='报修内容' dataIndex='summary' key='summary' />
                        <Table.Column title='维修人员' dataIndex='serviceman' key='serviceman' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            key='action'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.serviceman === '' &&
                                        <DrawerForm
                                            btnText='修改'
                                            btnIcon='edit'
                                            btnType='primary'
                                            onSubmit={this.onChange.bind(this, record)}
                                            form={[
                                                {
                                                    type: 'textArea',
                                                    text: '报修内容',
                                                    name: 'summary',
                                                    placeholder: '请输入你想要报修的信息',
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
export default UserRepair;
