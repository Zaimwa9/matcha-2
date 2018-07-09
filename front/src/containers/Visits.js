import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Grid, Modal, Dropdown, Header } from 'semantic-ui-react';

import FeedCard from '../components/FeedCard';

class Visits extends Component {
  componentWillMount() {
    if (this.props.appUser.isFilled && !this.props.feed.fetched) {
      this.props.fetchFeedUsers(this.props.appUser.uuid)
    } else if (!this.props.appUser.isFilled) {
      this.props.fetchFeedUsers(this.props.userIn.uuid)
    }
  }

  handleDropChange = (event, {value}) => {
    this.props.updateDropdown(value);
  }

  render() {
    const fetchedProfiles = (this.props.feed) ? this.props.feed.profiles : [];

    var profiles = _.filter(fetchedProfiles, profile => {
      // add completed profile
      return (profile.pictures[0]);
    })

    const cards =
      _.map(profiles, profile => {
        return (
          <Grid.Column key={profile.id}>
            <FeedCard
              profile={profile}
              newVisit={this.props.newVisit}
              reportUser={this.props.reportUser}
              blockUser={this.props.blockUser}
              likeUser={this.props.likeUser}
              unLikeUser={this.props.unLikeUser}
            />
          </Grid.Column>
        )
      })

    return (
      <Grid columns={2} stackable>
        <Grid.Column width={16}>
          <Header>Latest visits</Header>
        </Grid.Column>
        {cards}
      </Grid>
    )
  }

  static propTypes = {
    fetchFeedUsers: PropTypes.func.isRequired
  }
}

function mapStateToProps(state) {
  return {
    userIn: state.logSign.user,
    appUser: state.app.user,
    feed: state.app.feed,
    sortBy: state.app.sortBy
  };
}

export default connect(
  mapStateToProps,
)(Visits);
