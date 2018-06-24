import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

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
    return (
      <Grid columns='equal'>
        <Grid.Column>
          <FeedCard />
        </Grid.Column>
        <Grid.Column>
          <FeedCard />
        </Grid.Column>
        <Grid.Column>
          <FeedCard />
        </Grid.Column>
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
    feed: state.feed
  };
}

export default connect(
  mapStateToProps,
)(Feed);
