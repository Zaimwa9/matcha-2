import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Image, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import PictureCard from '../components/PictureCard'
import UploadPicture from '../components/UploadPicture'

class PicturesZone extends Component {
  handleManageMode = () => {
    this.props.pictureManageMode(this.props.pictureBlock.manageMode);
  }

  render() {
    const pictures = (this.props.appUser.pictures ? this.props.appUser.pictures : []);

    return (
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h2'>Pictures</Item.Header>
                <Icon
                  className='actionIcon'
                  name='edit'
                  color='black'
                  style={{float: 'right'}}
                  onClick={this.handleManageMode}
                />
                <Item.Meta>
                  {this.props.pictureBlock.manageMode ? 'Click on a picture to delete it' : ''}
                </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
        <Grid columns={5}>
          <Grid.Row centered columns={3} verticalAlign='middle'>
            {pictures[0] ? <PictureCard deletePicture={this.props.deletePicture} idkey={pictures[0].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[0].path} pictures={pictures} /> : ''}
            {pictures[1] ? <PictureCard deletePicture={this.props.deletePicture} idkey={pictures[1].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[1].path} pictures={pictures} /> : ''}
            {pictures[2] ? <PictureCard deletePicture={this.props.deletePicture} idkey={pictures[2].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[2].path} pictures={pictures} /> : ''}
          </Grid.Row>
          <Grid.Row centered columns={3}>
            {pictures[3] ? <PictureCard deletePicture={this.props.deletePicture} idkey={pictures[3].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[3].path} pictures={pictures} /> : ''}
            {pictures[4] ? <PictureCard deletePicture={this.props.deletePicture} idkey={pictures[4].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[4].path} pictures={pictures} /> : ''}
            {(this.props.pictureBlock.manageMode === true && pictures.length < 5) ?
              <UploadPicture postPictureUpload={this.props.postPictureUpload} uuid={this.props.appUser.uuid} /> : ''}
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    infoBlock: state.app.infoBlock,
    pictureBlock: state.app.pictureBlock
  };
}

export default connect(
  mapStateToProps,
)(PicturesZone);
