import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tweet from '../components/Tweet.jsx';
import Layout from '../components/Layout';

import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as profilesActions from '../actions/profiles.js';
import { bindActionCreators } from 'redux';

export class ViewProfilePage extends Component {
    state = {
        profile: {}
    };

    componentDidMount = async () => {
        const userId = this.props.match.params.id;
        const profile = await this.props.actions.loadProfile({ userId });
        this.setState({ profile });
    };

    render() {
        return (
            <Layout>
                <Container>
                    <Link to="/tweets">Go back to tweets list</Link>

                    <h1>User profile</h1>

                    <div>Email: {this.state.profile.email}</div>
                    <div>Name: {this.state.profile.firstName}</div>
                </Container>
            </Layout>
        );
    }
}

export default connect(
    state => state,
    dispatch => ({
        actions: {
            ...bindActionCreators(profilesActions, dispatch)
        }
    })
)(ViewProfilePage);
