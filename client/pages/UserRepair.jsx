import React, { Component } from 'react';
import PropType from 'prop-types';
import { Table, Button } from 'antd';

import '@/styles/pages/UserRepair.scss';

const data = {
    repair: [
        {
            keyr: '1',
            date: '2019-6-12',
            contentr: 'xxxxxxx',
            people: '',
            statusr: '未处理'
        },
        {
            keyr: '2',
            date: '2019-6-12',
            contentr: 'xxxxxxx',
            people: '小王',
            statusr: '已处理'
        },
        {
            keyr: '3',
            date: '2019-6-12',
            contentr: 'xxxxxxx',
            people: '小王',
            statusr: '已处理'
        },
        {
            keyr: '4',
            date: '2019-6-12',
            contentr: 'xxxxxxx',
            people: '小王',
            statusr: '已处理'
        },
        {
            keyr: '5',
            date: '2019-6-12',
            contentr: 'xxxxxxx',
            people: '小王',
            statusr: '已处理'
        },
    ]
};


export class UserRepair extends Component{
    constructor(props) {
        super(props);
        this.state = {
            repair: [
                {
                    title: '报修编号',
                    dataIndex: 'keyr',
                    key: 'keyr',
                },
                {
                    title: '报修日期',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: '报修内容',
                    dataIndex: 'contentr',
                    key: 'contentr',
                },
                {
                    title: '维修人员',
                    dataIndex: 'people',
                    key: 'people',
                },
                {
                    title: '状态',
                    dataIndex: 'statusr',
                    key: 'statusr',
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
        const {  repair } = this.state;
        return (
            <div id='repair'>
                <p>报修信息</p>
                <div className='line'></div>
                <div>
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
