import React, { Component } from 'react';
import { Collapse, Button, Input } from 'antd';
import PropTypes from 'prop-types';

import '@/styles/components/common/search.scss';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    static propTypes = {

    }

    onChange = (index, e) => {
        let arr = this.state.data;
        arr[e.target.name] = e.target.value.toString();
        this.setState({
            data: arr
        });
    }

    onSearch = e => {
        this.props.onSearch(this.state.data);
    }

    render() {
        const { data } = this.props;

        return (
            <div id='search'>
                <Collapse defaultActiveKey={['1']}>
                    <Collapse.Panel header='筛选条件' key='1'>
                        <div className='group'>
                            {data.map((item, index) => (
                                <Input
                                    key={index}
                                    className='item'
                                    name={item.name}
                                    addonBefore={item.title}
                                    placeholder={item.placeholder}
                                    onChange={this.onChange.bind(this, index)}
                                />
                            ))}
                            <Button
                                type='primary'
                                className='btn-search'
                                onClick={this.onSearch} >
                                搜索
                            </Button>
                        </div>
                    </Collapse.Panel>
                </Collapse>
            </div>
        );
    }
}

export default Search;
