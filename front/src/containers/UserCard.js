import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rating from 'react-rating';
import TagCloud from '../components/TagCloud';

import { Segment, Item, Divider, Popup, Icon } from 'semantic-ui-react';

//import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

class UserCard extends Component {
  handleUpdateMode = () => {
    this.props.setUpdateMode(this.props.infoBlock.updateMode);
  }

  render() {
    const hashtags = (this.props.appUser.hashtags ? this.props.appUser.hashtags : [])
    const rating = Math.round((this.props.appUser.popularity / 100 * 5) * 2) / 2;
    const age = moment().diff(moment.unix(this.props.appUser.age), 'years');
    const gender = this.props.appUser.gender === 'male' ? 'M' : 'F';

    return (
      <Segment textAlign='center'>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as='h2'>Profile</Item.Header>
                <Icon
                  className='actionIcon'
                  name='edit'
                  color='black'
                  style={{float: 'right'}}
                  onClick={this.handleUpdateMode}
                />
            </Item.Content>
          </Item>
        </Item.Group>
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
              {`${this.props.appUser.email}`}
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
                <Item.Header content={`${this.props.appUser.popularity}%`} />
              </Item.Content>
            </Item>
          </Item.Group>
          {hashtags.length > 0 ? <TagCloud hashtags={hashtags} visible='false'/> : ''}
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
