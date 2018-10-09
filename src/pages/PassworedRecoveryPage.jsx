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

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as profilesActions from '../actions/profiles.js';
import { bindActionCreators } from 'redux';
import errors2messages from '../errors2messages';

class PassworedRecoveryPage extends PureComponent {
    static propTypes = {};

    state = {
        fields: {
            email: '',
            phone: ''
        },
        errors: {}
    };

    handlePasswordRecoveryByEmail = async event => {
        event.preventDefault();

        const { email } = this.state.fields;

        try {
            await this.props.actions.resetPasswordByEmail({
                email
            });

            this.setState({
                fields: {
                    email: '',
                    phone: ''
                },
                errors: {}
            });
        } catch (error) {
            const messages = errors2messages(error.fields);

            this.setState({
                errors: {
                    email: messages['data/email'] || messages['email'],
                    phone: messages['data/phone'] || messages['phone']
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

        console.log(this.state);
    };

    render() {
        const { errors } = this.state;

        return (
            <Container>
                <div>
                    <Link to="/login">Back to login</Link>
                </div>
                <h1>Recover password</h1>
                <Form onSubmit={this.handlePasswordRecoveryByEmail}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            <b>Recover by email:</b>
                        </Label>
                        <Input
                            value={this.state.fields.email}
                            onChange={this.handleInputChange}
                            invalid={!!errors.email}
                            type="text  "
                            name="email"
                            id="exampleEmail"
                            placeholder="Enter your email"
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>

                    <Button>Recover by email</Button>
                </Form>
                <hr />
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">
                            <b>Recover by SMS:</b>
                        </Label>
                        <Input
                            value={this.state.fields.phone}
                            onChange={this.handleInputChange}
                            invalid={!!errors.phone}
                            type="phone"
                            name="phone"
                            id="exampleEmail"
                            placeholder="Enter your mobile number"
                        />
                        <FormFeedback>{errors.phone}</FormFeedback>
                    </FormGroup>

                    <Button>Recover by SMS</Button>
                </Form>
            </Container>
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
)(PassworedRecoveryPage);
