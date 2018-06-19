import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Menu } from 'semantic-ui-react';

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
  }

  render() {
    return (
      <Container fluid>
        <Menu pointing secondary size='massive'>
          <Menu.Item>
            MATCHA
          </Menu.Item>
          <Menu.Menu position='right' >
            <Link to={this.props.match.url === '/account' ? '/' : '/account'}>
              <Menu.Item
                name='account'
                active={this.props.activeItem === 'Account' || this.props.activeItem === 'Home'}
                onMouseOver={this.handleHoverIn}
                onMouseOut={this.handleHoverOut}
              >
                {this.props.match.url === '/account' ? 'Home' : 'Account'}
              </Menu.Item>
            </Link>
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

  static propTypes = {
    activeItem: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    setActiveItem: PropTypes.func.isRequired
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
