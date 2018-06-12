import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import PropTypes from 'prop-types';


class MyAuth extends Component {

  componentWillMount() {
    this.isAuthenticated();
    console.log(this.props.logSign.user.isAuth)
    if (this.props.logSign.user.isAuth) {
      this.props.history.push('/');
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
    if (nextProps.logSign.user.isAuth) {
      this.props.history.push('/');
    }
  }

  isAuthenticated = () => {
    if (!localStorage.getItem('token')) {
      return false;
    } else {
      // (!this.props.logSign.user.isAuth)
      this.props.actions.isAuth();
      if (this.props.logSign.user.isAuth) {
        this.props.history.push('/');
        console.log(this.props.history)
      }
      // console.log(this.props.logSign);
    }
  }

  render() {
    return (
      <div className='logBox'>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    logSign: state.logSign
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAuth);