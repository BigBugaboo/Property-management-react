import React, { Component } from 'react';
import { version, Button } from 'antd';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Please fork this codesandbox to reproduce your issue.</h1>
                <div>Current antd version: {version}</div>
                <div>
                    <Button type="primary">Example button</Button>
                </div>
            </div>
        );
    }
}
