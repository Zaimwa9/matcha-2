import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';

import { Grid, Form, Image, Header, Segment, Icon, Button, Message, Divider } from 'semantic-ui-react';

class LogSign extends Component {

  render () {
    return (
      <Segment padded>
        {this.props.myHeader()}
        <Link to='/signup'>
          <Button fluid primary basic>Create an account</Button>
        </Link>
        <Divider horizontal>Or</Divider>
          <Grid.Row>
            <Link to='/login'>
              <Button fluid primary basic >Log In</Button>
            </Link>
          </Grid.Row>
          <Grid.Row>
            <Button
              fluid
              color='facebook'
              icon labelPosition='left'
              style={{marginTop: '1rem'}}
              // onClick={this.loginFb}
              >Continue with Facebook<Icon name='facebook'/>
            </Button>
          </Grid.Row>
      </Segment>
    )
  }
}

export default LogSign;