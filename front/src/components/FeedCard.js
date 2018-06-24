import React, { Component } from 'react';

import { Segment, Item, Divider, Popup, Icon } from 'semantic-ui-react';

class FeedCard extends Component {
  render() {
    return (
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src='/annemo.jpg' />
            <Item.Content>
              <Item.Header>Header</Item.Header>
              <Item.Meta>Popularity</Item.Meta>
              <Item.Description>
                Hashtags viendront ici
              </Item.Description>
              <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    )
  }
}

export default FeedCard;
