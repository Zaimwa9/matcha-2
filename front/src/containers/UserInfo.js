import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rating from 'react-rating';

import { Segment, Input, Item, Divider, Popup } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class UserInfo extends Component {
  render() {
    const popularity = 74;
    const rating = Math.round((popularity / 100 * 5) * 2) / 2;

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