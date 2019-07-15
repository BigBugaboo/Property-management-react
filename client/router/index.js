/* eslint-disable no-undef */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import history from './history';

import SiderLayout from '@/layouts/SiderLayout';
import Login from '@/layouts/Login';

const routes = require('./routes.js');

class RouterIndex extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path='/' component={Login} />
                    <Route path='/Main' component={Mod} />
                </div>
            </Router>
        );
    }
}

export default RouterIndex;

const Mod = ({ match }) => (
    <Router history={history}>
        <SiderLayout>
            {routes.map((item, index) => {
                const path = match.url + item.path;
                return (
                    <Route exact key={index} path={path} component={item.component} />
                );
            })}
        </SiderLayout>
    </Router>
);
