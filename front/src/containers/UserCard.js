import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rating from 'react-rating';
import TagCloud from '../components/TagCloud';

import { Segment, Button, Input, Item, Divider, Popup, Icon } from 'semantic-ui-react';

import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

class UserCard extends Component {

  handleUpdateMode = () => {
    console.log(this.props.infoBlock.updateMode);
    this.props.setUpdateMode(this.props.infoBlock.updateMode);
  }

  render() {
    const fakeHash = [
      {key: 1, uuid: 1, content: 'drinks'},
      {key: 2, uuid: 1, content: 'bitch'},
      {key: 3, uuid: 1, content: 'football'},
      {key: 4, uuid: 1, content: 'beach'},
      {key: 5, uuid: 1, content: 'beach'},
      {key: 6, uuid: 1, content: 'beach'},
      {key: 7, uuid: 1, content: 'beach2'}
    ]
    const popularity = 74;
    const rating = Math.round((popularity / 100 * 5) * 2) / 2;
    const age = moment().diff(moment.unix(this.props.appUser.age).format('DD-MM-YYYY'), 'years');
    const gender = this.props.appUser.gender === 'male' ? 'M' : 'F';

    return (
      <Segment textAlign='center'>
        <Item>
          <Item.Image src='/annemo.jpg' centered size='medium' rounded />
        </Item>
        <Item.Group>
          <Item>
            <Item.Content verticalAlign='middle'>
              <Item.Header content={`${this.props.appUser.first_name}`} />
              {' '}
              <Item.Header content={`${this.props.appUser.last_name}`} />
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              {`${this.props.appUser.email}@hotmail.fr`}
            </Item.Content>
            <Item.Content>
              {`${age} ans - ${gender}`}
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider />
        <Item.Group relaxed>
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
                fullSymbol={<img alt='full symbol' src="/black_star.svg" className="rankingIcon" />}
                emptySymbol={<img alt='empty symbol' src="/empty_star.svg" className="rankingIcon" />}
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
          {fakeHash.length > 0 ? <TagCloud hashtags={fakeHash}/> : ''}
          <Item.Group>
            <Item>
              <Item.Content>
                  <Icon
                    className='actionIcon'
                    // color='black'
                    // size='mini'
                    // inverted
                    name='edit'
                    // size='small'
                    color='black'
                    style={{float: 'left'}}
                    onClick={this.handleUpdateMode}
                  />
              </Item.Content>
            </Item>
          </Item.Group>
      </Segment>
    )
  }

  static propTypes = {
    setUpdateMode: PropTypes.func.isRequired
  }
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    infoBlock: state.app.infoBlock
  };
}

export default connect(
  mapStateToProps,
)(UserCard);
