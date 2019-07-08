/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SiderLayout from '@/layouts/SiderLayout';
import Login from '@/layouts/Login';

const routes = require('./routes.js');

class RouterIndex extends Component {
    render() {
        return (
            <Switch>
                <Route path='/' component={Login} />
                <SiderLayout>
                    {routes.map((item, index) => (
                        <Route key={index} path={item.path} component={item.component} />
                    ))}
                </SiderLayout>
            </Switch>
        );
    }
}

export default RouterIndex;
