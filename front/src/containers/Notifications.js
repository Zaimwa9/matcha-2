import React, { Component } from 'react'

import { connect } from "react-redux";

import { graphql } from 'react-apollo';
import client from '../ApolloClient';
import gql from "graphql-tag";

import { Divider, Segment, Grid} from 'semantic-ui-react';

class Notifications extends Component {

  componentWillMount() {
    const sub = gql `
      subscription {
        newLike (user_uuid: "${this.props.userIn.uuid}"){
          first_name,
          last_name
        }
      }
    `;
    client.subscribe({
      query: sub
    }).subscribe({
      next(data) {
        console.log(data)
      }
    })
  }

  render () {
    return (
      <Segment>
        <Grid.Row>
          FirstNotifications will
        </Grid.Row>
        <Grid.Row>
          FirstNotifications will
        </Grid.Row>
        <Grid.Row>
        FirstNotifications will come hereFirstNotifications will come hereFirstNotifications will come here
        </Grid.Row>
        <Grid.Row>
        FirstNotifications will come hereFirstNotifications will come hereFirstNotifications will come here
        </Grid.Row>
      </Segment>
    )
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

export default connect(
  mapStateToProps,
)(Notifications);
