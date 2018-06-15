import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';

import AppHeader from '../components/AppHeader';
import UserCard from '../containers/UserCard';
import UserUpdate from '../containers/UserUpdate';

import { Container, Grid } from 'semantic-ui-react';

class Profile extends Component {
  componentWillMount() {
    if (!this.props.appUser.isFilled)
      this.props.actions.copyUser(this.props.userIn);
  }

  viewMode = () => {
    if (!this.props.infoBlock.updateMode) {
      return (
        <UserCard
          setUpdateMode={this.props.actions.setUpdateMode}
        />
      )
    } else {
      return (
        <UserUpdate
          updateUserField={this.props.actions.updateUserField}
          setUpdateMode={this.props.actions.setUpdateMode}
        />
      )
    }
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
              {this.viewMode()}
            </Grid.Column>
            <Grid.Column width={10}>
              Yo
            </Grid.Column>
          </Grid>
        </Container>
      </Container>
    )
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }
}

function mapStateToProps(state) {
  return {
    userIn: state.logSign.user,
    menu: state.app.menu,
    appUser: state.app.user,
    infoBlock: state.app.infoBlock
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
