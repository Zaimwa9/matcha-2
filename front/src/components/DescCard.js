import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Segment, Header, Form, TextArea, Container, Item, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class DescCard extends Component {
  handleChange = (e, {name, value}) => {
    this.props.updateUserField(this.props.appUser, name, value);
  }

  handleEditing = (e) => {
    this.props.setEditingMode(this.props.descBlock.editMode)
  }

  renderView = () => {
    if (this.props.descBlock.editMode) {
      return (
        <Form>
          <TextArea
            name='description'
            maxLength="400"
            value={this.props.appUser.description}
            onChange={this.handleChange}
            autoHeight
            placeholder='Tell us more about yourself (400 characters max)'
          />
        </Form>
      )
    } else {
      return (
        <Container text>
          <p>
            {this.props.appUser.description}
          </p>
        </Container>
      )
    }
  }

  render() {
    return (
      <Segment>
      <Item.Group>
        <Item>
          <Item.Content>
              <Icon
                className='actionIcon'
                name='edit'
                color='black'
                style={{float: 'right'}}
                onClick={this.handleEditing}
              />
          </Item.Content>
        </Item>
      </Item.Group>
      <Header as='h2'>
        Biography
      </Header>
        {this.renderView()}
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    descBlock: state.app.descBlock
  };
}

export default connect(
  mapStateToProps,
)(DescCard);
