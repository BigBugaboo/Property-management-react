import React, { memo } from 'react';
import { Result, Button } from 'antd';

const ErrorPage = memo(function ErrorPage(props) {
    return (
        <Result
            status={props.status.toString()}
            title={props.status}
            subTitle={props.status === 403 ? '权限不足，请返回主页登录！' : '页面不存在，请跳转到主页刷新！'}
            extra={
                <Button type='primary' onClick={props.onHome}>
                返回主页
                </Button>
            }
        />
    );
});

export default ErrorPage;
