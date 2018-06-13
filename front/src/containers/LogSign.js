import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Grid, Segment, Icon, Button, Divider } from 'semantic-ui-react';

/* global FB */

class LogSign extends Component {

//   componentDidMount() {
//     window.fbAsyncInit = function() {
//       FB.init({
//         appId            : '171100533563567',
//         autoLogAppEvents : true,
//         xfbml            : true,
//         version          : 'v3.0'
//       });
//     };

//     (function(d, s, id){
//       var js, fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) {return;}
//       js = d.createElement(s); js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));
//   }
// // https://developers.facebook.com/docs/graph-api/reference/user
//   loginFb = function() {
//     FB.getLoginStatus(function(response) {
//       if (response.status === 'connected') {
//         console.log('already connected')
//         FB.api('/me', {fields: 'email, photos'}, function(data) {
//           console.log(data);
//         })
//         }
//       if (response.status !== 'connected') {
//         FB.login(function(response) {
//           if (response.status === 'connected') {
//             console.log('allgood');
//             console.log(response);
//             FB.api('/me', {fields: 'email, photos'}, function(data) {
//               console.log(data);
//             })
//             localStorage.setItem('facebook', JSON.stringify(response.authResponse));
//           } else {
//             console.log('error happened');
//           }
//         }, {scope: 'public_profile, email'});
//       }
//     })
//   }

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
              onClick={this.loginFb}
              >Continue with Facebook<Icon name='facebook'/>
            </Button>
          </Grid.Row>
      </Segment>
    )
  }

  static propTypes = {
    myHeader: PropTypes.func.isRequired
  }
}

export default LogSign;