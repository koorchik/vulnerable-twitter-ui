import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class Tweet extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        numberOfLikes: PropTypes.number.isRequired,
        numberOfRetweets: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired
    };

    render() {
        const {
            text,
            author,
            numberOfLikes,
            numberOfRetweets,
            createdAt,
            userId
        } = this.props;

        return (
            <Jumbotron>
                <div>
                    Author: <Link to={`/profiles/${userId}`}>{author}</Link> |{' '}
                    {moment(createdAt).calendar()}
                </div>
                <div
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <div>
                    <Button color="info"> Likes | {numberOfLikes}</Button>{' '}
                    &nbsp;
                    <Button color="info"> Retweets | {numberOfRetweets}</Button>
                </div>
            </Jumbotron>
        );
    }
}
