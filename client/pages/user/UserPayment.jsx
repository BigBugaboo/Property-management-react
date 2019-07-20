import React, { Component } from 'react';
import { Table, Button, Icon, Modal, notification, message } from 'antd';
import QRCode from 'qrcode.react';

import { _list, _search, _pay, _queryPay } from '@/api/user/UserPayment.js';
import '@/styles/pages/user/UserPayment.less';
import Search from '@/components/common/Search';

export class UserPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listen: 0,
            qrCode: '',
            isLoading: true,
            data: [],
            search: [
                {
                    type: 'date',
                    title: '缴费日期',
                    placeholder: '请输入缴费日期',
                    name: 'date'
                }
            ],
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
        this.reloadList();
    }

    componentWillMount() {
        clearInterval(this.state.listen);
    }

    reloadList = async (data) => {
        this.onshow();
        let result = await _list();
        if (result.code === 403) {
            this.props.history.push('/403');
            message.error('缺少权限');
            return null;
        }
        let list = typeof data === 'object' ? data : result.data;
        list = list.map((item, index) => {
            return {
                key: index,
                ...item
            };
        });
        this.setState({
            data: list
        });
        this.onhide();
    }

    onSearch = (e) => {
        _search(e)
            .then((result) => {
                message.info(result.msg);
                this.reloadList(result.data);
            });
    }

    onPay = async (record, e) => {
        const result = await _pay(record);
        this.setState({
            qrCode: result.data.qrCode
        }, () => {
            const modal = Modal.success({
                okText: '取消',
                title: '请用支付宝扫码支付，点击右下角取消支付',
                onOk: () => {
                    clearInterval(this.state.listen);
                },
                content: <QRCode
                    value={this.state.qrCode} //value参数为生成二维码的链接
                    size={280} //二维码的宽高尺寸
                    fgColor='#000000'  //二维码的颜色
                />,
            });
            const int = setInterval(() => {
                this.onListenPay(result.data, modal);
            }, 2000);
            this.setState({
                listen: int
            });
        });
    }

    onListenPay = (data, modal) => {
        _queryPay(data)
            .then((response) => {
                if (response.code === 200) {
                    clearInterval(this.state.listen);
                    modal.destroy();
                    this.reloadList();
                    notification['success']({
                        message: '支付成功',
                        description: '已完成缴费，如有疑问请联系物业管理员。',
                    });
                }
            });
    }

    render() {
        const { search, data, isLoading } = this.state;
        return (
            <div id='Payment'>
                <div className='search'>
                    <Search data={search} onSearch={this.onSearch} />
                </div>
                <div className='blo'>
                    <h2>缴费信息</h2>
                    <div className='line'></div>
                    <Table dataSource={data} bordered={true} size='default' loading={isLoading}>
                        <Table.Column title='缴费编号' dataIndex='key' key='key' />
                        <Table.Column title='缴费日期' dataIndex='costDate' key='costDate' />
                        <Table.Column title='缴费项目' dataIndex='item' key='item' />
                        <Table.Column title='缴费总额' dataIndex='money' key='money' />
                        <Table.Column title='状态' dataIndex='status' key='status' />
                        <Table.Column
                            title='操作'
                            key='action'
                            render={(text, record) => (
                                <Button.Group>
                                    {record.status === '未缴费' &&
                                        <div>
                                            <Button type='primary' onClick={this.onPay.bind(this, record)}>
                                                <Icon type='alipay' />
                                                缴费
                                            </Button>
                                        </div>
                                    }
                                </Button.Group>
                            )}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}
export default UserPayment;
