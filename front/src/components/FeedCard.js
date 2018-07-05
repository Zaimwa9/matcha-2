import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { Segment, Item, Modal, Button } from 'semantic-ui-react';
import BrowsePeople from '../containers/BrowsePeople';

class FeedCard extends Component {

  handleModalClick = () => {
    this.props.newVisit(this.props.profile.uuid)
  }

  handleReportUser = () => {
    this.props.reportUser(this.props.profile.uuid)
  }

  render() {
    const hashtags =
    this.props.profile ?
    _.map(this.props.profile.hashtags, hash => {
      return (` #${hash.content} `)
    })
    : '';

    return (
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='small' src='/annemo.jpg' />
            <Item.Content>
              <Item.Header>{`${this.props.profile ? this.props.profile.first_name.substr(0, 1).toUpperCase() : ''}${this.props.profile ? this.props.profile.first_name.substr(1) : ''}`}</Item.Header>
              <Item.Description>
                {`${this.props.profile.gender.substr(0, 1).toUpperCase()}`}
              </Item.Description>
              <Item.Meta>Popularity</Item.Meta>
              <Item.Description>
                <strong>{hashtags}</strong>
              </Item.Description>
              <Item.Description>
                {`${this.props.profile.description ? this.props.profile.description.substr(0, 50) + '...' : ''}`}
              </Item.Description>

              <Modal
                trigger={<Item.Extra><p onClick={this.handleModalClick}>See More</p></Item.Extra>}
                size='large'
                dimmer='blurring'
                closeOnRootNodeClick={false}
                closeIcon
                centered={false}
              >
                <Modal.Content>
                  <BrowsePeople profile={this.props.profile ? this.props.profile : ''}/>
                </Modal.Content>

                <Modal.Actions>
                  <Button color='green' inverted size='large'>
                    Like !
                  </Button>
                  <Button color='red' inverted size='large'>
                    Block
                  </Button>
                  <Button onClick={this.handleReportUser} color='red' inverted size='small'>
                    Report
                  </Button>
                </Modal.Actions>
              </Modal>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    )
  }

  static propTypes = {
    profile: PropTypes.object.isRequired
  }
}

export default FeedCard;