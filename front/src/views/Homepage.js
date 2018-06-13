import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';
import AppHeader from '../components/AppHeader';

class Homepage extends Component {
  render() {
    console.log(this.props);
    return (
      <AppHeader
        activeItem={this.props.menu.activeItem}
        setActiveItem={this.props.actions.setActiveItem}
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
)(Homepage);