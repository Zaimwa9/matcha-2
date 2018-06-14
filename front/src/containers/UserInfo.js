import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rating from 'react-rating';

import { Segment, Input, Item, Divider, Popup } from 'semantic-ui-react';

import _ from 'lodash';
import PropTypes from 'prop-types';


class UserInfo extends Component {

  generateHashRow = (hash) => {
    return (
      <Item.Group>
        <Item>
          {hash}
        </Item>
      </Item.Group>
    )
  }

  chunkHash = (hashArr, index) => {
    if (index === 0) {
      return (
        _.map(_.chunk(hashArr, 4)[0], hash => {
          return (
            <Item.Content>
              {`#${hash.content}`}
            </Item.Content>
          )
        })
      )
    } else {
      return (
        _.map(_.chunk(hashArr, 4)[1], hash => {
          return (
            <Item.Content>
              {`#${hash.content}`}
            </Item.Content>
          )
        })
      )
    }
  }

  render() {
    const fakeHash = [
      {key: 1, uuid: 1, content: 'drinks'},
      {key: 2, uuid: 1, content: 'bitch'},
      {key: 3, uuid: 1, content: 'football'},
      {key: 4, uuid: 1, content: 'beach'},
      {key: 4, uuid: 1, content: 'beach'},
      {key: 4, uuid: 1, content: 'beach'},
      {key: 4, uuid: 1, content: 'beach2'}
    ]
    const popularity = 74;
    const rating = Math.round((popularity / 100 * 5) * 2) / 2;
    const hashtags1 = _.map(_.chunk(fakeHash, 4)[0], hash => {
      return (
        <Item.Content>
          {`#${hash.content}`}
        </Item.Content>
      )
    });

    const hashtags2 = _.map(_.chunk(fakeHash, 4)[1], hash => {
      return (
        <Item.Content>
          {`#${hash.content}`}
        </Item.Content>
      )
    })

    console.log(fakeHash)
    return (
      <Segment textAlign='center'>
        <Item>
          <Item.Image src='http://mradio.fr/media/news/thumb/870x489_jessica-alba-bb.jpg' centered size='medium' rounded />
        </Item>
        <Item.Group>
          <Item>
            <Item.Content verticalAlign='middle'>
              <Item.Header content={`${this.props.appUser.first_name} ${this.props.appUser.last_name}`} />
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              {`${this.props.appUser.email}@hotmail.fr`}
            </Item.Content>
            <Item.Content>
              27 ans - M
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider />
        <Item.Group>
          <Item>
            <Item.Content>
              <Popup
                className='popup'
                trigger= {<Item.Header content='Overall Popularity' />}
                content='Popularity is a score based on the safety of your account'
                on='click'
                size='mini'
              />
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              <Rating
                fullSymbol={<img alt='full symbol' src="/black_star.svg" className="icon" />}
                emptySymbol={<img alt='empty symbol' src="/empty_star.svg" className="icon" />}
                initialRating={rating}
                readonly />
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Item.Header content={`${popularity}%`} />
              </Item.Content>
            </Item>
          </Item.Group>
          {fakeHash.length > 0 ? this.generateHashRow(this.chunkHash(fakeHash, 0)) : ''}
          {fakeHash.length > 4 ? this.generateHashRow(this.chunkHash(fakeHash, 1)) : ''}
          {/* <Item.Group>
            <Item>
              {hashtags1}
            </Item>
          </Item.Group>
          <Item.Group>
            <Item>
              {hashtags2}
            </Item>
          </Item.Group> */}
          YOYOYOYOYO
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