import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon} from 'semantic-ui-react';

class SignupForm extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
    errEmail: false,
  }
  // A garder et update store a la toute fin

  handleChange = (event, {name, value}) => {
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state);
  }

  render () {
    const { first_name, last_name, email, password, cpassword} = this.state;
    console.log(this.props)
    return (
      <Form size='large' onSubmit={this.handleSubmit} error={this.props.logSign.signupForm.error.status}>
      <div>{this.props.logSign.signupForm.error.message}</div>
        <Segment padded>
          {this.props.myHeader()}
          <Form.Input required float='left' fluid name='first_name' value={first_name} label='First Name' placeholder='First Name' onChange={this.handleChange} />
          <Form.Input required float='left' fluid name='last_name' value={last_name} label='Last Name' placeholder='Last Name' onChange={this.handleChange} />
          <Form.Input required float='left' fluid name='email' value={email} label='Email' error={this.props.logSign.signupForm.error.status} placeholder='Email' onChange={this.handleChange} />

          <Form.Input required float='left' fluid name='email' value={this.props.logSign.signupForm.error.message} label='EmailTest' error={this.props.logSign.signupForm.error.status} placeholder='Email' onChange={this.handleChange} />

          <Form.Input required float='left' fluid type='password' name='password' value={password} label='Password' placeholder='Password' onChange={this.handleChange} />
          <Form.Input required float='left' fluid type='password' name='cpassword' value={cpassword} label='Confirm Password' placeholder='Confirm Password' onChange={this.handleChange} />
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
}

export default SignupForm;