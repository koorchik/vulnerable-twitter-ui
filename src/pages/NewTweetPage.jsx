import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback
} from 'reactstrap';
import * as tweetsActions from '../actions/tweets.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import errors2messages from '../errors2messages';
import Layout from '../components/Layout.jsx';

import { Editor } from '@tinymce/tinymce-react';

class NewTweetPage extends PureComponent {
    static propTypes = {};
    state = {
        fields: {
            title: 'DUMMY',
            text: '',
            image: null
        },
        errors: {}
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await this.props.actions.createTweet(this.state.fields);

            this.setState({
                fields: {
                    title: 'DUMMY',
                    text: '',
                    image: null
                },
                errors: {}
            });
        } catch (error) {
            const messages = errors2messages(error.fields, {
                context: 'LOGIN'
            });

            this.setState({
                errors: {
                    title: messages['data/title'],
                    text: messages['data/text'],
                    image: messages['data/image']
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

    handleEditorChange = ({ target }) => {
        this.setState(state => ({
            fields: {
                ...state.fields,
                text: target.getContent()
            }
        }));
    };

    render() {
        const { errors } = this.state;
        return (
            <Layout>
                <Container>
                    <div>
                        <Link to="/tweets">Go back to tweets list</Link>
                    </div>

                    <h1>Create new Tweeet</h1>

                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            {/* <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                    invalid={!!errors.title}
                                    value={this.state.fields.title}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    name="title"
                                    id="exampleTitle"
                                    placeholder="Title"
                                />
                                <FormFeedback>{errors.title}</FormFeedback>
                            </FormGroup> */}

                            <FormGroup>
                                <Label for="examplePassword">Text</Label>
                                <Editor
                                    invalid={!!errors.text}
                                    onChange={this.handleEditorChange}
                                    value={this.state.fields.text}
                                    init={{
                                        plugins: 'link image code',
                                        toolbar:
                                            'undo redo | bold italic | alignleft aligncenter alignright | code'
                                    }}
                                />
                                <FormText color="danger">
                                    {errors.text}
                                </FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleFile">Image</Label>
                                <Input
                                    invalid={!!errors.image}
                                    onChange={this.handleInputChange}
                                    type="file"
                                    name="file"
                                    id="exampleFile"
                                />
                                <FormFeedback>{errors.image}</FormFeedback>

                                <FormText color="muted">
                                    You can attach image to your tweet
                                </FormText>
                            </FormGroup>

                            <Button color="primary">Publish tweet</Button>
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
            ...bindActionCreators(tweetsActions, dispatch)
        }
    })
)(NewTweetPage);
