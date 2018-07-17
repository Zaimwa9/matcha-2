import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/appActions';

import AppHeader from '../components/AppHeader';

import { Divider, Container, Segment, Grid, Icon } from 'semantic-ui-react';
//import NewHashtag from '../components/NewHashtag';
import Feed from '../containers/Feed';
import Visits from '../containers/Visits';
import Notifications from '../containers/Notifications';
import Chat from '../containers/Chat';

class Homepage extends Component {
  componentWillMount() {
    if (!this.props.appUser.isFilled) {
      this.props.actions.copyUser(this.props.userIn);
    }
  }

  handleAppBox = (appBox) => {
    if (this.props.appBox !== appBox) {
      this.props.actions.switchView(appBox);
    }
  }

  renderBox = () => {
    if (this.props.appBox !== 'chat' && this.props.appBox !== 'visits') {
      return (
        <Feed
          fetchFeedUsers={this.props.actions.fetchFeedUsers}
          fetched={this.props.appBox ? this.props.feed.fetched : false}
          newVisit={this.props.actions.newVisit}
          reportUser={this.props.actions.reportUser}
          blockUser={this.props.actions.blockUser}
          likeUser={this.props.actions.likeUser}
          unLikeUser={this.props.actions.unLikeUser}
          updateDropdown={this.props.actions.updateDropdown}
          updateSearch={this.props.actions.updateSearch}
        />
      )
    } else if (this.props.appBox === 'visits') {
      return (
        <Visits
          fetchFeedUsers={this.props.actions.fetchFeedVisits}
          fetched={this.props.appBox ? this.props.feed.fetched : false}
          newVisit={this.props.actions.newVisit}
          reportUser={this.props.actions.reportUser}
          blockUser={this.props.actions.blockUser}
          likeUser={this.props.actions.likeUser}
          unLikeUser={this.props.actions.unLikeUser}
          updateDropdown={this.props.actions.updateDropdown}
        />
      )
    } else if (this.props.appBox === 'chat') {
      return (
        <Chat
          getMatches={this.props.actions.getMatches}
          writeMessage={this.props.actions.writeMessage}
          postMessage={this.props.actions.postMessage}
          switchChat={this.props.actions.switchChat}
          getMessages={this.props.actions.getMessages}
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
        <Segment  style={{minHeight: '94vh'}}>
            <Grid.Row style={{textAlign: 'right'}}>
              <Icon.Group style={{cursor: 'pointer', marginLeft: '1em'}}>
                <Icon
                  name='venus mars'
                  size='big'
                  onClick={() => this.handleAppBox('feed')}
                />
              </Icon.Group>
              <Icon.Group
                style={{cursor: 'pointer', marginLeft: '1em'}}
                size='big'
                onClick={() => this.handleAppBox('chat')}
              >
                <Icon name='chat' />
                {/*<Icon corner name='pointer' />*/}
              </Icon.Group>
              <Icon.Group
                style={{cursor: 'pointer', marginLeft: '1em'}}
                size='big'
                onClick={() => this.handleAppBox('visits')}
              >
                <Icon name='low vision' />
              </Icon.Group>
            </Grid.Row>
            <Divider />
            <Grid>
              <Grid.Column width={4}>
                <Notifications
                  fetchNotifs={this.props.actions.fetchNotifs}
                  newNotif={this.props.actions.newNotif}
                />
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={11}>
                {this.renderBox()}
              </Grid.Column>
            </Grid>
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
    appUser: state.app.user,
    feed: state.app.feed,
    appBox: state.app.appBox
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
