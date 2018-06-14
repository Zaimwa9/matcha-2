import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';
import AppHeader from '../components/AppHeader';

class Profile extends Component {
  render() {
    return (
      <AppHeader
        setActiveItem={this.props.actions.setActiveItem}
        logout={this.props.actions.logout}
        {...this.props}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.logSign.user,
    menu: state.app.menu
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
)(Profile);