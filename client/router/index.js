/* eslint-disable no-undef */
import React, { Component } from 'react';
import { HashRouter as Router, Route, } from 'react-router-dom';
import Loadable from '@loadable/component';

import Loading from '@/components/common/Loading';
import history from './history';
import SiderLayout from '@/layouts/SiderLayout';
// import Login from '@/layouts/Login';
const Login = Loadable(() => import('@/layouts/Login'));
// const SiderLayout = Loadable(() => import('@/layouts/SiderLayout'), {
//     fallback: Loading,
// });

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
