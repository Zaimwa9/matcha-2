import React, { Component } from 'react';
import { Image, Icon, Item } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class PictureCard extends Component {
  render() {
    const url='https://pbs.twimg.com/profile_images/807269899819225089/1dqgaL06_400x400.jpg';
//    <Icon size='large' color='orange' className='pictureIcon' name='remove' />

    return(
      <Item.Group >
        <Item style={{justifyContent: 'center'}}>
          <Item.Image src={url} centered verticalAlign='middle' />
        </Item>
      </Item.Group>
    )
  }
}

export default PictureCard;
