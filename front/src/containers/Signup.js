import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import PropTypes from 'prop-types';

import SignupForm from '../components/SignupForm';

class Signup extends Component {

  componentWillUnmount() {
    this.props.actions.updateField('first_name', '');
    this.props.actions.updateField('last_name', '');
    this.props.actions.updateField('email', '');
    this.props.actions.updateField('password', '');
    this.props.actions.updateField('cpassword', '');
    this.props.actions.resetForm();
  }

  render () {
    return (
      <SignupForm
        myHeader={this.props.myHeader}
        logSign={this.props.logSign}
        signup={this.props.actions.signup}
        updateField={this.props.actions.updateField}
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
)(Signup);