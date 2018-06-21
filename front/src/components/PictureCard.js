import React, { Component } from 'react';
import { Grid, Image, Icon, Item } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class PictureCard extends Component {
  handleClick = (idkey) => {
    console.log(idkey)
  }

  render() {
    return (
      <Grid.Column>
        <Item.Group unstackable>
          <Item style={{justifyContent: 'center'}} >
            <Item.Image
              onClick={() => this.handleClick(this.props.idkey)}
              idkey={this.props.idkey}
              className={this.props.manageMode ? 'picManageMode' : ''}
              src={this.props.url}
              centered
              verticalAlign='middle'
            />
          </Item>
        </Item.Group>
      </Grid.Column>
    )
  }
}

export default PictureCard;
