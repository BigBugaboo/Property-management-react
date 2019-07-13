import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Icon, Input, Button, Collapse } from 'antd';

import '@/styles/pages/user/UserRepair.scss';
import Search from '@/components/common/Search';
import DrawerForm from '@/components/common/DrawerForm';

const data = {
    repair: [
        {
            key: '1',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '',
            status: '未处理'
        },
        {
            key: '2',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '3',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '4',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '5',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '6',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '7',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '8',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '9',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '10',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '11',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '12',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '13',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '14',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
        {
            key: '15',
            date: '2019-6-12',
            content: 'xxxxxxx',
            people: '小王',
            status: '已处理'
        },
    ]
};


export class UserRepair extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: [
                {
                    type: 'textArea',
                    text: '报修内容',
                    name: 'content',
                    placeholder: '请输入你想要报修的信息',
                    value: '',
                },
            ],
            search: [
                {
                    title: '报修内容',
                    placeholder: '请输入报修内容',
                    name: 'startdate'
                }
            ],
            repair: [
                {
                    title: '报修编号',
                    dataIndex: 'key',
                    key: 'key',
                },
                {
                    title: '报修日期',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: '报修内容',
                    dataIndex: 'content',
                    key: 'content',
                },
                {
                    title: '维修人员',
                    dataIndex: 'people',
                    key: 'people',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type='primary' className='btn'>修改</Button>
                        </span>
                    ),
                },
            ]
        };
    }

    onSearch = (e) => {
        console.log(e);
    }

    render() {
        const { search, repair, form } = this.state;
        return (
            <div id='repair'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <p>报修信息</p>
                    <div className='line'></div>
                    <DrawerForm
                        btnText='添加'
                        btnIcon='plus'
                        btnType='primary'
                        form={form}
                    />
                    <Table
                        bordered={true}
                        columns={repair}
                        dataSource={data.repair}
                    />
                </div>
            </div>
        );
    }
}
export default UserRepair;
