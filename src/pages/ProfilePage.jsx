import React, { PureComponent } from 'react';

import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';

import { Link } from 'react-router-dom';

import Layout from '../components/Layout.jsx';

import { connect } from 'react-redux';
import * as profilesActions from '../actions/profiles.js';
import { bindActionCreators } from 'redux';
import errors2messages from '../errors2messages';
import history from '../history';

import jwt from 'jwt-simple';

class ProfilePage extends PureComponent {
    static propTypes = {};

    state = {
        fields: {
            email: '',
            firstName: ''
        }
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            console.log(
                'this.state.fields',
                this.state.fields,
                this.props.actions.updateProfile
            );

            const userData = jwt.decode(
                localStorage.getItem('token'),
                '',
                true
            );
            const userId = userData.id;

            await this.props.actions.updateProfile(userId, this.state.fields);

            history.push(`/profiles/${userId}`);
        } catch (error) {
            const messages = errors2messages(error.fields);

            this.setState({
                errors: {
                    email: messages['data/email'],
                    firstName: messages['data/firstName']
                }
            });
        }
    };

    handleInputChange = ({ target }) => {
        const value =
            target.type === 'checkbox' ? target.checked : target.value;

        const name = target.name;

        this.setState(state => ({
            fields: {
                ...state.fields,
                [name]: value
            }
        }));
    };

    componentDidMount = async () => {
        const userData = jwt.decode(localStorage.getItem('token'), '', true);
        const userId = userData.id;
        const profile = await this.props.actions.loadProfile({ userId });
        this.setState({ fields: profile });
    };

    render() {
        const { fields } = this.state;
        return (
            <Layout>
                <Container>
                    <div>
                        <Link to="/tweets">Go to tweets list</Link>
                    </div>

                    <h1>My Profile</h1>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                    disabled
                                    type="text"
                                    onChange={this.handleInputChange}
                                    value={fields.email}
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Email"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="firstName">Name</Label>
                                <Input
                                    type="text"
                                    onChange={this.handleInputChange}
                                    value={fields.firstName}
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Name"
                                />
                            </FormGroup>

                            <Button>Save profile</Button>
                        </Form>
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
            ...bindActionCreators(profilesActions, dispatch)
        }
    })
)(ProfilePage);
