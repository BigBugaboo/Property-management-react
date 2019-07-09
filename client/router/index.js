/* eslint-disable no-undef */
import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

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
    <Switch>
        <SiderLayout>
            {routes.map((item, index) => {
                const path = match.url + item.path;
                return (
                    <Route exact key={index} path={path} component={item.component} />
                );
            })}
            {/* <PrivateRoute path='/protected' component={Protected} /> */}
        </SiderLayout>
    </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ?
            (
                <Component {...props} />
            )
            : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            )
    )}
    />
);
