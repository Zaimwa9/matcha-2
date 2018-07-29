import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// import _ from 'lodash';

import { Grid, Modal, Form, Button, Segment, Icon, Message } from 'semantic-ui-react';

class LoginForm extends Component {

  handleChange = (event, {name, value}) => {
    this.props.updateField(name, value);
  }

  handleSubmitReset = () => {
    this.props.resetPassword(this.props.emailReset);
    this.props.history.push('/');
  }

  handleEmail = (event, {name, value}) => {
    this.props.updateEmail(value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.props.logSign.user);
    this.props.history.push('/')
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
            value={email ? email : ''}
            icon='user'
            iconPosition='left'
            placeholder='Email'
            spellCheck="false"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            name='password'
            value={password ? password : ''}
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            spellCheck="false"
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

          <Modal trigger={<p style={{fontStyle: 'italic', marginTop: '0.5em'}}>Password forgotten?</p>} basic size='small' closeIcon>
            <Modal.Header>Reset Password</Modal.Header>
              <Segment>
              <Modal.Content>
                <Modal.Description>
                  <Form size='small' onSubmit={this.handleSubmitReset}>
                    <Form.Input
                      type='text'
                      name='email'
                      label='Email'
                      onChange={this.handleEmail}
                    />
                    <Button>Reset</Button>
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Segment>
          </Modal>

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
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }
}

function mapStateToProps(state) {
  return {
    emailReset: state.logSign.emailReset,
  };
}

export default connect(
  mapStateToProps
)(LoginForm);
