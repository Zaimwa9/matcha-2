import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

class Homepage extends Component {
  render() {
    return (
      <div className='Homepage'>
        This is gonna be the app
      </div>
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
)(Homepage);