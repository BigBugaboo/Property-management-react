import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Icon, Button } from 'antd';

import '@/styles/pages/user/UserComplaint.scss';
import Search from '@/components/common/Search';
import DrawerForm from '@/components/common/DrawerForm';


const data = [
    {
        key: '1',
        startdate: '2019-6-12',
        content: 'xxxxxxx',
        enddate: '',
        status: '未处理'
    },
    {
        key: '2',
        startdate: '2019-6-12',
        content: 'xxxxxxx',
        enddate: '2019-6-12',
        status: '已处理'
    },
    {
        key: '3',
        startdate: '2019-6-12',
        content: 'xxxxxxx',
        enddate: '2019-6-12',
        status: '已处理'
    },
    {
        key: '4',
        startdate: '2019-6-12',
        content: 'xxxxxxx',
        enddate: '2019-6-12',
        status: '已处理'
    },
    {
        key: '5',
        startdate: '2019-6-12',
        content: 'xxxxxxx',
        enddate: '2019-6-12',
        status: '已处理'
    },
];


export class UserComplaint extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'textArea',
                    text: '投诉内容',
                    name: 'content',
                    placeholder: '请输入你想要投诉的信息',
                    value: '',
                },
            ],
            search: [
                {
                    type: 'date',
                    title: '投诉日期',
                    placeholder: '请输入投诉日期',
                    name: 'startdate'
                }
            ],
        };
    }

    onSearch = (e) => {
        console.log(e);
    }

    onChange = (e) => {
        console.log(e);
    };

    render() {
        const { search, form } = this.state;
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
                        form={form}
                    />
                    <Table dataSource={data} bordered={true} size='default'>
                        <Table.Column title='投诉编号' dataIndex='key' key='key' />
                        <Table.Column title='投诉日期' dataIndex='startdate' key='startdate' />
                        <Table.Column title='投诉内容' dataIndex='content' key='content' />
                        <Table.Column title='处理日期' dataIndex='enddate' key='enddate' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            key='action'
                            render={(text, record) => (
                                <Button.Group>
                                    { record.enddate == '' &&
                                    <DrawerForm
                                        btnText='修改'
                                        btnIcon='edit'
                                        btnType='primary'
                                        onSubmit={this.onChange}
                                        form={[
                                            {
                                                type: 'textArea',
                                                text: '投诉内容',
                                                name: 'content',
                                                placeholder: '请输入你想要投诉的信息',
                                                value: record.content,
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
