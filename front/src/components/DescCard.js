import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Segment, Button, Form, TextArea, Container, Item, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class DescCard extends Component {
  handleChange = (e, {name, value}) => {
    this.props.updateUserField(this.props.appUser, name, value);
  }

  handleEditing = (e) => {
    this.props.setEditingMode(this.props.descBlock.editMode)
  }

  handleSubmit = (e) => {
    this.props.postDescription(this.props.appUser.uuid, this.props.appUser.description);
  }

  renderView = () => {
    if (this.props.descBlock.editMode) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <TextArea
            name='description'
            maxLength="400"
            value={this.props.appUser.description}
            onChange={this.handleChange}
            autoHeight
            placeholder='Tell us more about yourself (400 characters max)'
          />
          <Button>
            Save
          </Button>
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
              <Item.Header as='h2'>Biography</Item.Header>
              <Icon
                className='actionIcon'
                  name={this.props.descBlock.editMode ? "cancel" : "edit"}
                color='black'
                style={{float: 'right'}}
                onClick={this.handleEditing}
              />
          </Item.Content>
        </Item>
      </Item.Group>
        {this.renderView()}
      </Segment>
    )
  }

  static propTypes = {
    setEditingMode: PropTypes.func.isRequired,
    updateUserField: PropTypes.func.isRequired,
    postDescription: PropTypes.func.isRequired
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
