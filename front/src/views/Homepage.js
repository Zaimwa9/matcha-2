import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';

import AppHeader from '../components/AppHeader';
import BrowsePeople from '../containers/BrowsePeople';
import { Carousel } from 'react-responsive-carousel';
import { Divider, Container, Segment, Grid, Icon } from 'semantic-ui-react';
import NewHashtag from '../components/NewHashtag';

class Homepage extends Component {
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
        <Segment>
            <Grid.Row>
              <Icon
                name='venus mars'
                size='big'
              />
              <Icon.Group size='big'>
                <Icon name='chat' />
                <Icon corner name='mail' />
              </Icon.Group>
            </Grid.Row>
            <Divider />
            <NewHashtag />
          </Segment>
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
    appUser: state.app.user
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
