import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Grid, Modal } from 'semantic-ui-react';

import FeedCard from '../components/FeedCard';

class Feed extends Component {
  componentWillMount() {
    if (this.props.appUser.isFilled && !this.props.fetched) {
      this.props.fetchFeedUsers(this.props.appUser.uuid)
    } else if (!this.props.appUser.isFilled) {
      this.props.fetchFeedUsers(this.props.userIn.uuid)
    }
  }

  render() {

    const profiles = (this.props.feed) ? this.props.feed.profiles : [];
    const cards =
      _.map(profiles, profile => {
        return (
          <Grid.Column key={profile.id}>
            <FeedCard profile={profile} />
          </Grid.Column>
        )
      })
    return (
      <Grid columns={2} stackable>
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
    feed: state.app.feed
  };
}

export default connect(
  mapStateToProps,
)(Feed);
