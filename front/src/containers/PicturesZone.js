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
    pictures && pictures[0] ? console.log(pictures[0].id): '';
    return (
      <Segment >
        {this.props.pictureBlock.manageMode ? 'Click on a picture to delete it' : ''}
        <Item.Group>
          <Item>
            <Item.Content>
                <Icon
                  className='actionIcon'
                  name='edit'
                  color='black'
                  style={{float: 'right'}}
                  onClick={this.handleManageMode}
                />
            </Item.Content>
          </Item>
        </Item.Group>
        <Grid columns={5}>
          <Grid.Row centered columns={3} verticalAlign='middle'>
            {pictures[0] ? <PictureCard idkey={pictures[0].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[0].path} /> : ''}
            {pictures[1] ? <PictureCard idkey={pictures[1].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[1].path} /> : ''}
            {pictures[2] ? <PictureCard idkey={pictures[2].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[2].path} /> : ''}
          </Grid.Row>
          <Grid.Row centered columns={3}>
            {pictures[3] ? <PictureCard idkey={pictures[3].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[3].path} /> : ''}
            {pictures[4] ? <PictureCard idkey={pictures[4].id} manageMode={this.props.pictureBlock.manageMode} url={pictures[4].path} /> : ''}
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
