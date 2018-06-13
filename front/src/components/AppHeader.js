import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Container, Grid, Menu, Button } from 'semantic-ui-react';

class AppHeader extends Component {
  render() {
    console.log(this.props)
    return (
      <Container fluid>
        <Menu pointing secondary size='massive'>
          <Menu.Item>
            MATCHA
          </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item
              name='profile'
              active
              position='right'
              as='a'
            >
              Profile
            </Menu.Item>
            <Menu.Item position='right' as='a'>
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}

export default AppHeader;