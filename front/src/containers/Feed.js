import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Grid, Modal, Dropdown } from 'semantic-ui-react';

import FeedCard from '../components/FeedCard';

class Feed extends Component {
  componentWillMount() {
    if (this.props.appUser.isFilled && !this.props.fetched) {
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
    const sortingBy = this.props.sortBy ? this.props.sortBy.value : sortOptions[0].value;

    var profiles = _.filter(fetchedProfiles, profile => {
      // add completed profile
      return (profile.pictures[0]);
    })

    var sortOrder;
    if (sortingBy === 'distance') {
      sortOrder = 'asc';
    } else {
      sortOrder = 'desc';
    }

    profiles = _.orderBy(profiles, [sortingBy], [sortOrder]);

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

    const sortOptions = [
      {
        text: 'popularity',
        value: 'popularity'
      },
      {
        text: 'distance',
        value: 'distance'
      },
      {
        text: 'age',
        value: 'age'
      },
      {
        text: 'hashtags',
        value: 'hashtags'
      }
    ]

    return (
      <Grid columns={2} stackable>
        <Grid.Column width={16}>
          <span>
            Sort by{' '}
            <Dropdown
              inline
              options={sortOptions}
              value={this.props.sortBy.text ? this.props.sortBy.text : sortOptions[0].value}
              onChange={this.handleDropChange}
            />
          </span>
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
)(Feed);
