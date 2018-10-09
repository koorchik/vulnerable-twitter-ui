import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tweet from '../components/Tweet.jsx';
import Layout from '../components/Layout';

import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as sessionsActions from '../actions/sessions.js';
import * as tweetsActions from '../actions/tweets.js';
import { bindActionCreators } from 'redux';

export class TweetsPage extends Component {
    state = {
        tweets: []
    };

    componentDidMount = async () => {
        const tweets = await this.props.actions.loadTweets();
        this.setState({ tweets });
    };

    render() {
        return (
            <Layout>
                <Container>
                    <div>
                        <Link to="/tweets/new">Create new tweet</Link>
                    </div>

                    <h1>Tweets stream</h1>

                    <div>
                        {this.state.tweets.map(tweet => (
                            <Tweet key={tweet.id} {...tweet} />
                        ))}
                    </div>

                    <div>
                        <Link to="/tweets/new">Create new tweet</Link>
                    </div>
                </Container>
            </Layout>
        );
    }
}

export default connect(
    state => state,
    dispatch => ({
        actions: {
            ...bindActionCreators(sessionsActions, dispatch),
            ...bindActionCreators(tweetsActions, dispatch)
        }
    })
)(TweetsPage);
