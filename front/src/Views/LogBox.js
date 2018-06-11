import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Image, Header } from 'semantic-ui-react';

import LogSign from '../containers/LogSign';
import LoginForm from '../containers/Login';
import SignupForm from '../containers/Signup';

class LogBox extends Component {

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
    } else if (this.props.match.url === '/login') {
      return <LoginForm myHeader={this.myHeader} />;
    }
    return <LogSign myHeader={this.myHeader} />;
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

export default LogBox;