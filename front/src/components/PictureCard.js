import React, { Component } from 'react';
import { Image, Icon, Item } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class PictureCard extends Component {
  render() {
    const url='https://www.photo-paysage.com/albums/Paysages/Lac-riviere-cascade/normal_croatie-lacs-plitvice-cascades-7.jpg';

    return(
      <Item.Group>
        <Item>
          <Icon size='large' color='orange' className='pictureIcon' name='remove' />
          <Item.Image src={url} centered verticalAlign='middle' spaced />
        </Item>
      </Item.Group>
    )
  }
}

export default PictureCard;
