import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import { Grid, Divider, Segment, Input } from 'semantic-ui-react';

class Chat extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
        hello
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    )
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
)(Chat);
