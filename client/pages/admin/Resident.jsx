import React, { Component } from 'react';
import { PageHeader } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/counter';


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
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>
                        住户
                    </div>
                </div>
            </>
        );
    }
}

export default Index;
