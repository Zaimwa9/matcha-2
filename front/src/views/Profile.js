import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';
import AppHeader from '../components/AppHeader';

class Profile extends Component {
  componentWillMount() {
    if (!this.props.appUser.isFilled)
      this.props.actions.copyUser(this.props.userIn);
  }

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
    userIn: state.logSign.user,
    menu: state.app.menu,
    appUser: state.app.user,
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