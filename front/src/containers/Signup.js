import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import _ from 'lodash';

import { Grid, Form, Button, Segment, Icon} from 'semantic-ui-react';

import SignupForm from '../components/SignupForm';

class Signup extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
    submitted: false,
    errEmail: false,
  }
  // A garder et update store a la toute fin

  handleChange = (event, {name, value}) => {
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.signup(this.state);
  }

  render () {
    const { first_name, last_name, email, password, cpassword} = this.state;
    console.log(this.props)
    return (
      <SignupForm myHeader={this.props.myHeader} logSign={this.props.logSign} signup={this.props.actions.signup}/>
      // <Form size='large' onSubmit={this.handleSubmit} error={this.props.logSign.signupForm.error.status}>
      // <div>{this.props.logSign.signupForm.error.message}</div>
      //   <Segment padded>
      //     {this.props.myHeader()}
      //     <Form.Input required float='left' fluid name='first_name' value={first_name} label='First Name' placeholder='First Name' onChange={this.handleChange} />
      //     <Form.Input required float='left' fluid name='last_name' value={last_name} label='Last Name' placeholder='Last Name' onChange={this.handleChange} />
      //     <Form.Input required float='left' fluid name='email' value={email} label='Email' error={this.props.logSign.signupForm.error.status} placeholder='Email' onChange={this.handleChange} />

      //     <Form.Input required float='left' fluid name='email' value={this.props.logSign.signupForm.error.message} label='EmailTest' error={this.props.logSign.signupForm.error.status} placeholder='Email' onChange={this.handleChange} />

      //     <Form.Input required float='left' fluid type='password' name='password' value={password} label='Password' placeholder='Password' onChange={this.handleChange} />
      //     <Form.Input required float='left' fluid type='password' name='cpassword' value={cpassword} label='Confirm Password' placeholder='Confirm Password' onChange={this.handleChange} />
      //     <Button loading={this.props.logSign.signupForm.submitted} disabled={this.props.logSign.signupForm.submitted} color='blue' fluid size='large'>Confirm account</Button>
      //     <Grid>
      //       <Grid.Row style={{paddingLeft: '1rem'}}>
      //       </Grid.Row>
      //       <Grid.Row style={{paddingLeft: '1rem'}}>
      //         <Link to='/'>
      //           <Button icon labelPosition='left' size='mini'>
      //             Previous<Icon name='left arrow'/>
      //           </Button>
      //         </Link>
      //       </Grid.Row>
      //     </Grid>
      //   </Segment>
      // </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    logSign: state.logSign
    // user: state.logSign.user,
    // signupForm: state.logSign.signupForm
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
)(Signup);