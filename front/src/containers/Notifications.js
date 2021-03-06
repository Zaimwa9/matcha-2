import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from "react-redux";

import client from '../ApolloClient';
import gql from "graphql-tag";

import { Divider, Segment, Grid, Header, Item, Icon } from 'semantic-ui-react';

class Notifications extends Component {

  componentWillMount() {
    this.props.fetchNotifs(this.props.userIn.uuid);
  }

  componentDidMount() {
    const newNotif = this.props.newNotif;
    const messageReceived = this.props.messageReceived;

    const uuid = this.props.userIn.uuid;
    const sub_like = gql `
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
      query: sub_like
    }).subscribe({
      next(data) {
        if (data.data.newLike && data.data.newLike.uuid !== uuid) {
          newNotif(data.data.newLike, 'like');
        }
      }
    })

    const sub_visit = gql `
    subscription {
      newVisit (user_uuid: "${this.props.userIn.uuid}"){
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
      query: sub_visit
    }).subscribe({
      next(data) {
        if (data.data.newVisit && data.data.newVisit.uuid !== uuid) {
          newNotif(data.data.newVisit, 'visit');
        }
      }
    })

    const sub_message = gql `
    subscription {
      newMessage (user_uuid: "${this.props.userIn.uuid}"){
        id,
        content,
        author_uuid,
        receiver_uuid,
        sent_at,
        author {
          first_name,
          pictures {
            id,
            path
          }
        },
        receiver {
          first_name
        }
      }
    }
    `;
    client.subscribe({
      query: sub_message
    }).subscribe({
      next(data) {
        if (data.data.newMessage && data.data.newMessage.receiver_uuid === uuid) {
          newNotif(data.data.newMessage, 'message');
          messageReceived(data.data.newMessage);
        }
      }
    })

    const sub_match = gql `
    subscription {
      newMatch (user_uuid: "${this.props.userIn.uuid}"){
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
      query: sub_match
    }).subscribe({
      next(data) {
        const match = _.filter(data.data.newMatch, user => {
          return user.uuid !== uuid
        })
        newNotif(match[0], 'match');
      }
    })

    const sub_unmatch = gql `
    subscription {
      unMatch (user_uuid: "${this.props.userIn.uuid}"){
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
      query: sub_unmatch
    }).subscribe({
      next(data) {
        if (data.data.unmatch && data.data.unMatch.uuid !== uuid) {
          newNotif(data.data.unMatch, 'unmatch');
        }
      }
    })
  }

  generateText = (name, type, date) => {
    switch (type) {
      case 'like':
        return `${name} liked you!`;
      case 'match':
        return `Wow! You and ${name} matched!`;
      case 'unmatch':
        return `Too bad... ${name} unmatched you`;
      case 'unlike':
        return `Too bad... ${name} unliked you`;
      case 'visit':
        return `${name} visited your profil on date`;
      case 'message':
        return `${name} sent you a message!`
      default:
        return ``
    }
  }


  render () {

    var myNotifs = _.chunk(this.props.notifs, 30)[0];
    myNotifs = _.uniqBy(myNotifs, notif => {
      return notif.id;
    })

    const notifs =
      _.map(myNotifs, notif => {
        if (notif.sender_profile && notif.sender_profile.uuid !== this.props.userIn.uuid) {
          return (
            <Grid.Row key={notif.id}>
              <Item.Group className={notif.new ? 'newNotif' : ''}>
                <Item>
                  {notif.sender_profile.pictures ? <Item.Image size='mini' src={notif.sender_profile.pictures[0].path} /> : '' }
                  <Item.Content>
                    <Item.Description>
                      {notif.new ? <Icon name='lightbulb outline' color='black' style={{float: 'left'}} /> : ''}
                      {this.generateText(notif.sender_profile.first_name, notif.type, notif.received_at)}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
              <Divider/>
            </Grid.Row>
          )
        }
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
