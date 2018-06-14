import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Menu, Button } from 'semantic-ui-react';

class AppHeader extends Component {

  handleHoverIn = (event) => {
    const item = event.target.innerHTML;
    this.props.setActiveItem(item);
  }

  handleHoverOut = (event) => {
    this.props.setActiveItem('');
  }

  handleLogout = () => {
    this.props.logout();
    window.location.reload();
    // this.props.history.push('/');
  }

  render() {
    var { activeItem } = this.props.activeItem;

    return (
      <Container fluid>
        <Menu pointing secondary size='massive'>
          <Menu.Item>
            MATCHA
          </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item
              name='profile'
              as='a'
              active={this.props.activeItem === 'Profile'}
              onMouseOver={this.handleHoverIn}
              onMouseOut={this.handleHoverOut}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              position='right'
              as='a'
              name='Logout'
              active={this.props.activeItem === 'Logout'}
              onMouseOver={this.handleHoverIn}
              onMouseOut={this.handleHoverOut}
              onClick={this.handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}
function mapStateToProps(state) {
  return {
    activeItem: state.app.menu.activeItem
  };
}

export default connect(
  mapStateToProps,
)(AppHeader);
