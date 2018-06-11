import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon, Message} from 'semantic-ui-react';

class LoginForm extends Component {

  handleChange = (event, {name, value}) => {
    this.props.updateField(name, value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.props.logSign.user);
  }
  renderError = () => {
    if (this.props.logSign.signupForm.error.status)
      return (
        <Message
          error={this.props.logSign.signupForm.error.status}
          content='The email and password given do not match any account'
        />
      )
  }

  render () {
    const { email, password } = this.props.logSign.user;

    return (
      <Form size='large' onSubmit={e => this.handleSubmit(e)} error={this.props.logSign.signupForm.error.status}>
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
            disabled={this.props.logSign.signupForm.submitted}
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

  static propTypes = {
    myHeader: PropTypes.func.isRequired,
    updateField: PropTypes.func.isRequired,
    logSign: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }
}

export default LoginForm;