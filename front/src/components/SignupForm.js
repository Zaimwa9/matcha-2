import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon, Label } from 'semantic-ui-react';

class SignupForm extends Component {

  handleChange = (event, {name, value}) => {
    this.props.updateField(name, value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.props.logSign.user);
    this.props.history.push('/');
  }

  errorMessage = () => {
    if (this.props.logSign.signupForm.error.status) {
      return (
        <Label
          pointing
          basic color='red'
          style={{marginTop: '0rem', marginBottom: '1rem'}}
        >{this.props.logSign.signupForm.error.message}</Label>
      )
    }
  }

  render () {
    const { first_name, last_name, email, password, cpassword} = this.props.logSign.user;

    return (
      <Form size='large' onSubmit={this.handleSubmit} error={this.props.logSign.signupForm.error.status}>
        <Segment padded>
          {this.props.myHeader()}
          <Form.Input
            required float='left'
            fluid name='first_name'
            value={first_name ? first_name : ''}
            type='text'
            pattern="[A-Za-z]{3,12}"
            title="Firstname must contain only letters (between 3 and 12 characters)"
            label='First Name' placeholder='First Name'
            spellCheck='false'
            onChange={this.handleChange}
          />
          <Form.Input
            required
            float='left'
            fluid
            name='last_name'
            type='text'
            pattern="[A-Za-z]{3,12}"
            title="Last must contain only letters (between 3 and 12 characters)"
            value={last_name ? last_name : ''}
            label='Last Name'
            placeholder='Last Name'
            spellCheck='false'
            onChange={this.handleChange}
          />
          <Form.Input
            required
            float='left'
            fluid
            name='email'
            type='email'
            value={email ? email : ''}
            label='Email'
            error={this.props.logSign.signupForm.error.status}
            placeholder='Email'
            spellCheck='false'
            onChange={this.handleChange}
          />
          {this.errorMessage()}
          <Form.Input
            required
            float='left'
            fluid
            type='password'
            name='password'
            pattern='^(?=.*\d).{6,}$'
            title="Password must contain at least 6 characters including 1 digit"
            value={password ? password : ''}
            label='Password'
            placeholder='Password'
            spellCheck='false'
            onChange={this.handleChange}
          />
          <Form.Input
            required
            float='left'
            fluid
            type='password'
            name='cpassword'
            pattern='^(?=.*\d).{6,}$'
            title="Password must contain at least 6 characters including 1 digit"
            value={cpassword ? cpassword : ''}
            label='Confirm Password'
            placeholder='Confirm Password'
            spellCheck='false'
            onChange={this.handleChange}
          />
          <Button loading={this.props.logSign.signupForm.submitted} disabled={this.props.logSign.signupForm.submitted} color='blue' fluid size='large'>Confirm account</Button>
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
    signup: PropTypes.func.isRequired,
    logSign: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
}

export default SignupForm;
