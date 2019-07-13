import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Icon, Input, Button, Collapse } from 'antd';

import '@/styles/pages/user/UserRepair.scss';
import UserAdd from '@/components/common/UserAdd';

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
                    name: '报修内容',
                    placeholder: '请输入你想要报修的信息'
                },
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

    render() {
        const {  repair, form } = this.state;
        return (
            <div id='repair'>
                <Collapse className='search' defaultActiveKey={['1']}>
                    <Collapse.Panel header='筛选条件' key='1'>
                        <div className='search-group'>
                            <Input className='group-item' addonBefore='报修内容' defaultValue='' placeholder='请输入报修内容' />
                            <Button type='primary' >
                                搜索
                            </Button>
                        </div>
                    </Collapse.Panel>
                </Collapse>
                <div className='blo'>
                    <p>报修信息</p>
                    <div className='line'></div>
                    <UserAdd title='添加' form={form} />
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
