/* eslint-disable no-undef */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import SiderLayout from '@/layouts/SiderLayout';
import Login from '@/layouts/Login';

const routes = require('./routes.js');

class RouterIndex extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path='/' component={Login} />
                        <Route path='/Main' component={Mod} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default RouterIndex;

const Mod = ({ match }) => (
    <Router>
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
