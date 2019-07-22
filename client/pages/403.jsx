import React, { memo } from 'react';
import Error from '@/components/common/Error';

const onHome = (e) => {
    e.history.push('/');
};

const ErrorPage = memo(function ErrorPage(props) {
    return (
        <Error
            status={403}
            onHome={onHome.bind(this, props)}
        />
    );
});

export default ErrorPage;
