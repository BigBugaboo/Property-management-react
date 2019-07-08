import React, { Component } from 'react';
import { PageHeader } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../api/counter';


const mapStateToProps = (state, ownProps) => {
    return state.count;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <PageHeader style={{ margin: '16px 0' }} onBack={() => null} title="Title" subTitle="This is a subtitle" />
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>
                        <h1>{this.props.count}</h1>
                        <button onClick={this.props.actions.increase}>增加</button>
                        <button onClick={this.props.actions.decrease}>减少</button>
                        <button onClick={this.props.actions.asyncIncrease}>异步增加</button>
                        <button onClick={this.props.actions.asyncDecrease}>异步增加</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Index;
