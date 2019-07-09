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
                <Switch>
                    <Route exact={true} path='/' component={Login} />
                    <SiderLayout>
                        {routes.map((item, index) => (
                            <Route key={index} path={item.path} component={item.component} />
                        ))}
                        {/* <PrivateRoute path='/protected' component={Protected} /> */}
                    </SiderLayout>
                </Switch>
            </div>
        );
    }
}

export default RouterIndex;

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
