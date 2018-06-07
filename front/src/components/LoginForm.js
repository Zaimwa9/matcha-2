import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon, Message} from 'semantic-ui-react';

class LoginForm extends Component {

  state = {
    info: {email: '', password: ''},
    submitted: false,
    error: false,
  }

  handleChange = (event, {name, value}) => {
    event.preventDefault();
    const info = this.state.info;
    info[name] = value;
    this.setState({ info: info })
  }

  renderError = () => {
    if (this.state.error)
      return (
        <Message
          error={this.state.error}
          content='The email and password given do not match any account'
        />
      )
  }

  render () {
    const { email, password } = this.state.info;

    return (
      <Form size='large' onSubmit={e => this.handleSubmit(e)} error={this.state.error}>
        <Segment padded>
          {this.props.myHeader()}
          <Form.Input
            fluid
            name='email'
            value={email}
            icon='user'
            iconPosition='left'
            placeholder='Email'
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            name='password'
            value={password}
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          {this.renderError()}
          <Button
            fluid
            disabled={this.state.submitted}
            color='blue'
            size='large'>
            Login
          </Button>
          <Grid>
            <Grid.Row style={{paddingLeft: '1rem'}}>
            </Grid.Row>
            <Grid.Row style={{paddingLeft: '1rem'}}>
              <Link to='/'>
                <Button icon labelPosition='left' size='mini'>
                  Previous<Icon name='left arrow'/>
                </Button>
              </Link>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    )
  }
}
export default LoginForm;