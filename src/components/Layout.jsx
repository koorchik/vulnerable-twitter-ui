import React, { Component } from 'react';

import {
    Container,
    Navbar,
    Button,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as sessionsActions from '../actions/sessions.js';
import { bindActionCreators } from 'redux';
import jwt from 'jwt-simple';

export class Layout extends Component {
    handleLogout = () => {
        this.props.actions.logout();
    };

    render() {
        const userData = jwt.decode(localStorage.getItem('token'), '', true);

        return (
            <Container>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>{userData.email}</NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button>
                                <Link style={{ color: 'white' }} to="/profile">
                                    Edit my profile
                                </Link>
                            </Button>
                        </NavItem>
                        &nbsp;
                        <NavItem>
                            <Button onClick={this.handleLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
                </Navbar>
                <div>{this.props.children}</div>
            </Container>
        );
    }
}

export default connect(
    state => state,
    dispatch => ({
        actions: {
            ...bindActionCreators(sessionsActions, dispatch)
        }
    })
)(Layout);
