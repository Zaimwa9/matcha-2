import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from "react-redux";

import { graphql } from 'react-apollo';
import client from '../ApolloClient';
import gql from "graphql-tag";

import { Divider, Segment, Grid, Header, Item } from 'semantic-ui-react';

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchNotifs(this.props.userIn.uuid);
  }
  componentDidMount() {
    const myFunc = this.props.newNotif;
    const sub = gql `
      subscription {
        newLike (user_uuid: "${this.props.userIn.uuid}"){
          first_name,
          last_name,
          uuid,
          id,
          distance,
          first_name,
          last_name,
          gender,
          age,
          address,
          description,
          popularity,
          is_liked,
          count_hashtags,
          likesyou,
          hashtags {
            content
          },
          pictures {
            id,
            path
          }
        }
      }
    `;
    client.subscribe({
      query: sub
    }).subscribe({
      next(data) {
        myFunc(data.data.newLike, 'like');
        console.log(data.data.newLike)
      }
    })
  }

  generateText = (name, type, date) => {
    switch (type) {
      case 'like':
        return `${name} liked you on date!`;
      case 'match':
        return `Wow! You and ${name} matched!`;
      case 'unmatch':
        return `Too bad... ${name} unmatched you`;
      case 'unlike':
        return `Too bad... ${name} unliked you`;
      case 'visit':
        return `${name} visited your profil on date`;
    }
  }


  render () {

    const myNotifs = this.props.notifs;
    const notifs =
      _.map(myNotifs, notif => {
      return (
        <Grid.Row key={notif.id}>
        <Item.Group className={notif.new ? 'newNotif' : ''}>
          <Item>
            {notif.sender_profile.pictures ? <Item.Image size='mini' src={notif.sender_profile.pictures[0].path} /> : '' }
            <Item.Content>
              <Item.Description>
                {this.generateText(notif.sender_profile.first_name, notif.type, notif.received_at)}
              </Item.Description>
            </Item.Content>
          </Item>
          </Item.Group>
          <Divider/>
        </Grid.Row>
        )
      })

    return (
      <Segment style={{width: 'inherit', position: 'fixed', marginTop: '1em', marginLeft: '1em', overflowY: 'scroll', height: '600px'}}>
        <Header>Latest Notifications</Header>
        {notifs}
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
    appBox: state.app.appBox,
    notifs: state.app.notifs
  };
}

export default connect(
  mapStateToProps,
)(Notifications);
