import React, { Component } from 'react';
import { Collapse, Button, Input, DatePicker, Radio } from 'antd';

import '@/styles/components/common/search.less';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChange = (name, e, str) => {
        let arr = this.state.data;
        let value;
        if (!e) {
            value = '';
        }
        else {
            value = e.target === undefined ? str : e.target.value;
        }
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
                            className='item-input'
                            placeholder={item.placeholder}
                            onChange={this.onChange.bind(this, item.name)}
                        />
                    );
                },
                input: () => {
                    return (
                        <Input
                            key={key}
                            className='item-input'
                            addonBefore={item.title}
                            placeholder={item.placeholder}
                            onChange={this.onChange.bind(this, item.name)}
                        />
                    );
                },
                radio: () => {
                    return (
                        <Radio.Group
                            className='item'
                            key={key}
                            buttonStyle='solid'
                            defaultValue=''
                            onChange={this.onChange.bind(this, item.name)}>
                            <Radio.Button value=''>全部</Radio.Button>
                            {item.list.map((text, index) => (
                                <Radio.Button value={text} key={index}>{text}</Radio.Button>
                            ))}
                        </Radio.Group>
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
