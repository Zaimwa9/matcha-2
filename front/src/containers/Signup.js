import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon} from 'semantic-ui-react';

import SignupForm from '../components/SignupForm';

class Signup extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
    submitted: false,
    errEmail: false,
  }
  // A garder et update store a la toute fin

  handleChange = (event, {name, value}) => {
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state);
  }

  render () {
    const { first_name, last_name, email, password, cpassword, submitted} = this.state;
    return (
      <SignupForm myHeader={this.props.myHeader} signup={this.props.actions.signup} />
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
)(Signup);