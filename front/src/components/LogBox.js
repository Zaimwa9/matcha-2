import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';

import { Grid, Form, Image, Header, Segment, Icon, Button, Message, Divider } from 'semantic-ui-react';

import LogSign from './LogSign';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class LogBox extends Component {

  componentWillMount() {
    // HERE WE ARE TRIGGERING THE ACTION
    this.props.actions.fetchUsers();
  }

  myHeader = () => {
    return (
      <Grid style={{marginBottom: '1rem'}}>
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Image src='/favicon.ico' style={{margin: 'auto'}}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={4}>
          <Header as='h2' textAlign='center'>
            {' '}Matcha
          </Header>
        </Grid.Row>
      </Grid>
    )
  }

  formRender = () => {
    if (this.props.match.url === '/signup') {
      return <SignupForm myHeader={this.myHeader} />;
    } else if (this.props.match.url === '/login')
      return <LoginForm myHeader={this.myHeader} />;
    return <LogSign myHeader={this.myHeader} {... this.props.users} />;
  };

  render() {
    return (
      <div className='logBox'>
        <Grid verticalAlign='middle' textAlign='center' style={{ height: '100%' }}>
          <Grid.Column style={{ maxWidth: 450, textAlign: 'start' }}>
            {this.formRender()}

          </Grid.Column>
        </Grid>
      </div>
    )
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogBox);