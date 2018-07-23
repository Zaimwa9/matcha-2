import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import { Grid, Dropdown, Input } from 'semantic-ui-react';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import FeedCard from '../components/FeedCard';

class Feed extends Component {
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

  handleSearchField = (field, value) => {
    this.props.updateSearch(field, value)
  }

  render() {
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

    const fetchedProfiles = (this.props.feed) ? this.props.feed.profiles : [];
    const sortingBy = this.props.sortBy ? this.props.sortBy.value : sortOptions[0].value;

    var profiles = _.filter(fetchedProfiles, profile => {
      return (profile.pictures[0]);
    });

    profiles = _.filter(fetchedProfiles, profile => {
      var sex;
      if (this.props.appUser.orientation === 'Bi') {
        return profile;
      } else if (this.props.appUser.orientation === 'Hetero') {
        sex = this.props.appUser.gender === 'male' ? 'female' : 'male';
        return profile.gender === sex;
      } else if (this.props.appUser.orientation === 'Gay') {
        sex = this.props.appUser.gender === 'male' ? 'male' : 'female';
        return profile.gender === sex;
      }
    })

    var sortOrder;
    if (sortingBy === 'distance') {
      sortOrder = 'asc';
    } else {
      sortOrder = 'desc';
    }

    profiles = _.orderBy(profiles, [sortingBy], [sortOrder]);

    if (this.props.search) {
      profiles = _.filter(profiles, profile => {
        var flag = false;
        if (this.props.search.hashtags === '') {
          flag = true;
        } else {
          const hash = _.split(this.props.search.hashtags, ' ');
          if (profile.hashtags) {
            _.forEach(profile.hashtags, (item) => {
               if (_.includes(hash, item.content)) {
                 flag = true;
               }
            })
          }
        }
        const age = moment().diff(moment.unix(profile.age), 'years');
        return (
          (age >= this.props.search.age.min && age <= this.props.search.age.max)
          && (profile.popularity >= this.props.search.popularity.min && profile.popularity <= this.props.search.popularity.max)
          && (profile.distance <= this.props.search.distance)
          && (flag === true)
        )
      })
    }

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
        <Grid.Column verticalAlign='bottom' width={3}>
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
        <Grid.Column width={3}>
          <p style={{textAlign: 'center'}}>Age</p>
          <InputRange
            minValue={18}
            maxValue={99}
            value={this.props.search ? this.props.search.age: {min: 18, max: 99}}
            onChange={(value) => this.handleSearchField('age', value)}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <p style={{textAlign: 'center'}}>Popularity</p>
          <InputRange
            minValue={25}
            maxValue={100}
            value={this.props.search ? this.props.search.popularity: {min: 25, max: 100}}
            onChange={(value) => this.handleSearchField('popularity', value)}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <p style={{textAlign: 'center'}}>Distance</p>
          <InputRange
            minValue={0}
            maxValue={500}
            value={this.props.search ? this.props.search.distance: 500}
            onChange={(value) => this.handleSearchField('distance', value)}
          />
        </Grid.Column>
        <Grid.Column width={4} verticalAlign='bottom' style={{textAlign: 'center'}}>
          <Input
            icon='search'
            iconPosition='left'
            placeholder='Search hashtags...'
            value={this.props.search ? this.props.search.hashtags : ''}
            onChange={(event, {value}) => this.handleSearchField('hashtags', value)}
          />
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
    sortBy: state.app.sortBy,
    search: state.app.search
  };
}

export default connect(
  mapStateToProps,
)(Feed);
