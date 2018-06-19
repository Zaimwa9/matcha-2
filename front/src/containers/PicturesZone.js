import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Divider, Popup, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';
import PictureCard from '../components/PictureCard'

class PicturesZone extends Component {
  handleOnDrop = (event) => {
    console.log(event)
  }

  render() {
    return (
      <Segment >
        <Grid columns={5}>
          <Grid.Row centered columns={3} verticalAlign='middle'>
            <Grid.Column>
              <PictureCard />
            </Grid.Column>
            <Grid.Column style={{height:'100%'}}>
              <Dropzone
                className='dropzone'
                activeClassName='active-dropzone'
                onDrop={this.handleOnDrop}
              />
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
