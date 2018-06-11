import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import SignupForm from '../components/SignupForm';

class Signup extends Component {

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