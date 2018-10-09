import React, { PureComponent } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    FormFeedback
} from 'reactstrap';

import errors2messages from '../errors2messages';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as sessionsActions from '../actions/sessions.js';

class LoginPage extends PureComponent {
    static propTypes = {};

    state = {
        fields: {
            email: '',
            password: ''
        },
        errors: {}
    };

    handleLogin = async event => {
        event.preventDefault();

        const { email, password } = this.state.fields;

        try {
            await this.props.actions.login({
                email,
                password
            });
        } catch (error) {
            const messages = errors2messages(error.fields, {
                context: 'LOGIN'
            });
            this.setState({
                errors: {
                    email: messages['data/email'] || messages['email'],
                    password: messages['data/password'] || messages['password']
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

    render() {
        const { errors } = this.state;
        console.log('errors', errors);

        return (
            <Container>
                <h1>Login to the system</h1>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                            invalid={!!errors.email}
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            type="text"
                            name="email"
                            id="exampleEmail"
                            placeholder="Email"
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            invalid={!!errors.password}
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Password"
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                    </FormGroup>

                    <Button>Login</Button>

                    <div>
                        <Link to="/password-recovery">Forgot my password</Link>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default connect(
    state => state,
    dispatch => ({ actions: bindActionCreators(sessionsActions, dispatch) })
)(LoginPage);
