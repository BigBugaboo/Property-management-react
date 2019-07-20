import React, { memo } from 'react';
import { Result, Button } from 'antd';

const onHome = (e) => {
    e.history.push('/');
};

const ErrorPage = memo(function ErrorPage(props) {
    return (
        <Result
            status='403'
            title='403'
            subTitle='Sorry, you are not authorized to access this page.'
            extra={
                <Button type='primary' onClick={onHome.bind(this, props)}>
                返回主页
                </Button>
            }
        />
    );
});

export default ErrorPage;
