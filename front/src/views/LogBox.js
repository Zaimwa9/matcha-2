import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Image, Header } from 'semantic-ui-react';

import LogSign from '../containers/LogSign';
import Login from '../containers/Login';
import Signup from '../containers/Signup';

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

  formRender = (props) => {
    if (this.props.match.url === '/signup') {
      return <Signup myHeader={this.myHeader} history={{...props.history}}/>;
    } else if (this.props.match.url === '/login') {
      return <Login myHeader={this.myHeader} history={{...props.history}}/>;
    }
    return <LogSign myHeader={this.myHeader} history={{...props.history}}/>;
  };

  render() {
    return (
      <div className='logBox'>

        <Grid verticalAlign='middle' textAlign='center' style={{ height: '100%' }}>
          <Grid.Column style={{ maxWidth: 450, textAlign: 'start' }}>

            {this.formRender(this.props)}

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