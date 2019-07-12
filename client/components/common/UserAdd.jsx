import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, TextArea } from 'antd';

const { Option } = Select;

class UserAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
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

    render() {
        const { form, title } = this.props;
        const { visible } = this.state;

        return (
            <div>
                <Button
                    type='primary'
                    onClick={this.showDrawer}
                    style={{ marginBottom: 16 }}>
                    <Icon type='plus' />
                    {title}
                </Button>
                <Drawer
                    title={title}
                    width={400}
                    onClose={this.onClose}
                    visible={visible}>
                    <Form layout='vertical' hideRequiredMark={true}>
                        <Row gutter={16}>
                            <Col span={12}>
                                {form.map((item, index) => (
                                    <Form.Item label={item.name} key={index}>
                                        <Input placeholder={item.placeholder} />
                                        {/* <TextArea rows={6} placeholder={item.placeholder} /> */}
                                    </Form.Item>
                                ))}

                            </Col>
                        </Row>
                    </Form>
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
            </div>
        );
    }
}

UserAdd.propTypes = {

};

const App = Form.create()(UserAdd);

export default App;
