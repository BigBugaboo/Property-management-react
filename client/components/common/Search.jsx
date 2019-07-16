import React, { Component } from 'react';
import { Collapse, Button, Input, DatePicker } from 'antd';
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

    onChange = (name, e, str) => {
        let arr = this.state.data;
        let value = e.target === undefined ? str : e.target.value;
        arr[name] = value.toString();
        this.setState({
            data: arr
        });
    }

    onSearch = e => {
        this.props.onSearch(this.state.data);
    }

    render() {
        const { data } = this.props;

        const FormSelect = (type, key, item) => {
            const actions = {
                date: () => {
                    return (
                        <DatePicker
                            key={key}
                            className='item'
                            placeholder={item.placeholder}
                            onChange={this.onChange.bind(this, item.name)}
                        />
                    );
                },
                input: () => {
                    return (
                        <Input
                            key={key}
                            className='item'
                            addonBefore={item.title}
                            placeholder={item.placeholder}
                            onChange={this.onChange.bind(this, item.name)}
                        />
                    );
                }
            };

            if (typeof actions[type] !== 'function') return null;
            return actions[type]();
        };

        return (
            <div id='search'>
                <Collapse defaultActiveKey={['1']}>
                    <Collapse.Panel header='筛选条件' key='1'>
                        <div className='group'>
                            {data.map((item, index) => (
                                FormSelect(item.type, index, item)
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
