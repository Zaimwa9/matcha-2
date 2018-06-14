import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Grid, Segment, Image, Input, Card, Item, Divider } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class UserInfo extends Component {
  render() {
    return (
      <Segment textAlign='center'>
        <Item>
          <Item.Image src='http://mradio.fr/media/news/thumb/870x489_jessica-alba-bb.jpg' centered size='medium' rounded />
        </Item>
        <Item.Group>
          <Item>
            <Item.Content verticalAlign='middle'>
              <Item.Header as='a' content={`${this.props.appUser.first_name} ${this.props.appUser.last_name}`} />
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              27 ans - M
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider />
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
  };
}

export default connect(
  mapStateToProps,
)(UserInfo);