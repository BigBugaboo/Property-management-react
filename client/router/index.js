/* eslint-disable no-undef */
import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';

import SiderLayout from '@/layouts/SiderLayout';
import Login from '@/layouts/Login';

const routes = require('./routes.js');

class RouterIndex extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path='/' component={Login} />
                    <SiderLayout>
                        {routes.map((item, index) => (
                            <Route key={index} path={item.path} component={item.component} />
                        ))}
                    </SiderLayout>
                </Switch>
            </Router>
        );
    }
}

export default RouterIndex;
