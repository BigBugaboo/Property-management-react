import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    Icon
} from 'antd';

class DrawerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        };
        this.onChange = this.onChange.bind(this);
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (name, key, e) => {
        const value = e.target === undefined ? e : e.target.value;
        let arr = this.state.data;
        arr[key] = {
            name: name,
            value: value.toString(),
        };
        this.setState({
            data: arr
        });
    };

    render() {
        const { form, btnText, btnType, btnIcon } = this.props;
        const { visible } = this.state;

        const FormSelect = (key, type, item) => {
            const actions = {
                input: () => {
                    return (
                        <Input
                            placeholder={item.placeholder}
                            defaultValue={item.value}
                            onChange={this.onChange.bind(this, item.name, key)}
                        />
                    );
                },
                textArea: () => {
                    return (
                        <Input.TextArea
                            rows={16}
                            autosize={false}
                            defaultValue={item.value}
                            onChange={this.onChange.bind(this, item.name, key)}
                        />
                    );
                },
                select: () => {
                    return (
                        <Select
                            style={{ width: 200 }}
                            value={item.value}
                            onChange={this.onChange.bind(this, item.name, key)}>
                            {item.option.map((child, index) => (
                                <Select.Option key={index} value={child.value}>{child.text}</Select.Option>
                            ))}
                        </Select>
                    );
                }
            };

            if (typeof actions[type] !== 'function') return null;

            return actions[type]();
        };

        return (
            <>
                <Button
                    type={btnType}
                    onClick={this.showDrawer}
                    style={{ marginBottom: 16 }}>
                    <Icon type={btnIcon} />
                    {btnText}
                </Button>
                <Drawer
                    title={btnText}
                    width={400}
                    onClose={this.onClose}
                    visible={visible}>
                    <div>
                        <Row gutter={16}>
                            <Col span={24}>
                                {form.map((item, index) => (
                                    <Form.Item label={item.text} key={index}>
                                        {FormSelect(index, item.type, item)}
                                    </Form.Item>
                                ))}
                            </Col>
                        </Row>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={this.onClose} type='primary'>
                            确认
                        </Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

export default DrawerForm;
