import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon, Message} from 'semantic-ui-react';

import LoginForm from './LoginForm'

class Login extends Component {

  state = {
    info: {email: '', password: ''},
    submitted: false,
    error: false,
  }

  handleChange = (event, {name, value}) => {
    event.preventDefault();
    const info = this.state.info;
    info[name] = value;
    this.setState({ info: info })
  }

  renderError = () => {
    if (this.state.error)
      return (
        <Message
          error={this.state.error}
          content='The email and password given do not match any account'
        />
      )
  }

  render () {
    const { email, password } = this.state.info;

    return (
      <LoginForm />
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);