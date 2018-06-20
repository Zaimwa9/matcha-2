import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Image, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import PictureCard from '../components/PictureCard'
import UploadPicture from '../components/UploadPicture'

class PicturesZone extends Component {

/*
<Item.Group>
  <Item style={{justifyContent: 'center'}}>
  <Item.Meta>
    <Dropzone
    className='dropzone'
    activeClassName='active-dropzone'
    onDrop={this.handleOnDrop}
    >
    </Dropzone>
    </Item.Meta>
  </Item>
</Item.Group>
<Item.Image src={url} centered verticalAlign='middle' />

*/

  render() {
    const pictures = (this.props.appUser.pictures ? this.props.appUser.pictures : []);

    return (
      <Segment >
        <Grid columns={5}>
          <Grid.Row centered columns={3} verticalAlign='middle'>

            {pictures[0] ? <PictureCard url={pictures[0].path} /> : ''}
            {pictures[1] ? <PictureCard url={pictures[1].path} /> : ''}
            {pictures[2] ? <PictureCard url={pictures[2].path} /> : ''}
          </Grid.Row>
          <Grid.Row centered columns={3}>
            {pictures[3] ? <PictureCard url={pictures[3].path} /> : ''}
            {pictures[4] ? <PictureCard url={pictures[4].path} /> : ''}
            <UploadPicture postPictureUpload={this.props.postPictureUpload} uuid={this.props.appUser.uuid} />
          </Grid.Row>
        </Grid>
      </Segment>
    )
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
)(PicturesZone);
