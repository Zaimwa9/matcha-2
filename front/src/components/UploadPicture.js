import React, { Component } from 'react';
import { Grid, Item, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';

class UploadPicture extends Component {
  handleOnDrop = (event) => {
    this.props.postPictureUpload(event[0], this.props.uuid);
  }

  render() {
    return (
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
    )
  }

  static propTypes = {
    postPictureUpload: PropTypes.func.isRequired
  }
}

export default UploadPicture;
