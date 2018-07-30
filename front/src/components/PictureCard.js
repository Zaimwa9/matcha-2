import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class PictureCard extends Component {
  handleClick = (idkey) => {
    this.props.deletePicture(idkey, this.props.pictures);
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

  static propTypes = {
    deletePicture: PropTypes.func.isRequired
  }
}

export default PictureCard;
