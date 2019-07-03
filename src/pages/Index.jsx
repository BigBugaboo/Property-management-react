import React, { Component } from 'react';
import { PageHeader } from 'antd';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <PageHeader style={{ margin: '16px 0' }} onBack={() => null} title="Title" subTitle="This is a subtitle" />
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
            </>
        );
    }
}
