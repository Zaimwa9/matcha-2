import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Image, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';
import PictureCard from '../components/PictureCard'

class PicturesZone extends Component {
  handleOnDrop = (event) => {
    console.log(event)
  }
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
    const url='https://opensource.ncsa.illinois.edu/confluence/download/attachments/7930052/draganddrop.png?version=1&modificationDate=1310053949000&api=v2';
    return (
      <Segment >
        <Grid columns={5}>
          <Grid.Row centered columns={3} verticalAlign='middle'>
            <Grid.Column>
              <PictureCard />
            </Grid.Column>
            <Grid.Column style={{height:'100%'}}>
            <Item.Group>
              <Item style={{justifyContent: 'center'}}>
              <Dropzone
              className='dropzone'
              activeClassName='active-dropzone'
              onDrop={this.handleOnDrop}
              >
              <div className='contentDropzone'>
                <p className='textDropzone'>Drag your picture here or click to browse</p>
                <Image src='/dropbox.svg' size='mini' centered/>
              </div>
              </Dropzone>
              </Item>
            </Item.Group>

            </Grid.Column>
            <Grid.Column>
              <PictureCard />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={3}>
              <Grid.Column>
                <PictureCard />
              </Grid.Column>
              <Grid.Column>
                <PictureCard />
              </Grid.Column>
              <Grid.Column>
                <PictureCard />
              </Grid.Column>
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
