import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import PropTypes from 'prop-types';

// import _ from 'lodash';

import LoginForm from '../components/LoginForm';

class Login extends Component {

  componentWillUnmount() {
    this.props.actions.updateField('email', '');
    this.props.actions.updateField('password', '');
  }

  render () {
    return (
      <LoginForm
        resetPassword={this.props.actions.resetPassword}
        updateEmail={this.props.actions.updateEmail}
        myHeader={this.props.myHeader}
        logSign={this.props.logSign}
        login={this.props.actions.login}
        updateField={this.props.actions.updateField}
        history={this.props.history}
      />
    )
  }

  static propTypes = {
    myHeader: PropTypes.func.isRequired,
  }
}

function mapStateToProps(state) {
  return {
    logSign: state.logSign
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
