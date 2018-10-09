import React, { Component } from 'react';

import './App.css';

import { Router, Route, Switch, Redirect } from 'react-router-dom';

import TweetsPage from './pages/TweetsPage';
import NewTweetPage from './pages/NewTweetPage';
import ProfilePage from './pages/ProfilePage';
import ViewProfilePage from './pages/ViewProfilePage';
import LoginPage from './pages/LoginPage';
import PassworedRecoveryPage from './pages/PassworedRecoveryPage.jsx';

import api from './apiSingleton';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import thunk from 'redux-thunk';
import history from './history';

const store = createStore(rootReducer, applyMiddleware(thunk));

api.apiClient.setToken(localStorage.getItem('token'));

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !!localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/tweets',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Switch>
                            <PublicRoute
                                exact
                                path="/login"
                                component={LoginPage}
                            />

                            <PublicRoute
                                path="/password-recovery"
                                component={PassworedRecoveryPage}
                            />

                            <PrivateRoute
                                path="/tweets/new"
                                component={NewTweetPage}
                            />

                            <PrivateRoute
                                path="/tweets"
                                component={TweetsPage}
                            />

                            <PrivateRoute
                                path="/profiles/:id"
                                component={ViewProfilePage}
                            />

                            <PrivateRoute
                                path="/profile"
                                component={ProfilePage}
                            />

                            <Redirect to="/login" />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
