/* eslint-disable no-undef */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from '@loadable/component';

import history from './history';
import SiderLayout from '@/layouts/SiderLayout';
// import Login from '@/layouts/Login';
const Login = Loadable(() => import('@/layouts/Login'));
const ErrorPage = Loadable(() => import('@/pages/ErrorPage'));

const routes = require('./routes.js');

class RouterIndex extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/Main' component={Mod} />
                    <Route component={ErrorPage}></Route>
                </Switch>
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
                    <Route history={history} exact key={index} path={path} component={item.component} />
                );
            })}
        </SiderLayout>
    </Router>
);
