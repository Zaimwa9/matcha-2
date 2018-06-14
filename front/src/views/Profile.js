import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';

import AppHeader from '../components/AppHeader';
import UserInfo from '../containers/UserInfo';

import { Container, Grid } from 'semantic-ui-react';

class Profile extends Component {
  componentWillMount() {
    if (!this.props.appUser.isFilled)
      this.props.actions.copyUser(this.props.userIn);
  }

  render() {
    return (
      <Container fluid>
        <AppHeader
          setActiveItem={this.props.actions.setActiveItem}
          logout={this.props.actions.logout}
          {...this.props}
        />
        <Container fluid>
          <Grid>
            <Grid.Column width={6}>
              <UserInfo />
            </Grid.Column>
            <Grid.Column width={10}>
              Yo
            </Grid.Column>
          </Grid>
        </Container>
      </Container>
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