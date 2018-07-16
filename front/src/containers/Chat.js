import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import { Grid, Divider, Form, TextArea, Button, Segment, Input, Item } from 'semantic-ui-react';

class Chat extends Component {

  componentWillMount() {
    this.props.getMatches(this.props.userIn.uuid);
  }

  handleSubmit = () => {
    this.props.postMessage(this.props.userIn.uuid, this.props.chatBox.content, this.props.chatBox.match_uuid);
  }

  handleChange = (e, { value }) => {
    this.props.writeMessage(value);
  }

  handleClick = (uuid) => {
    this.props.switchChat(uuid);
  }

  render() {
    const myMatches = this.props.matches;
    const matchCards =
      _.map(myMatches, match => {
        return (
          <Grid.Row key={match.id} onClick={() => this.handleClick(match.uuid)}>
            <Item.Group>
              <Item>
                {match.pictures ? <Item.Image size='mini' src={match.pictures[0].path} /> : '' }
                <Item.Content>
                  <Item.Description>
                    {match.first_name.substr(0, 1).toUpperCase() + match.first_name.substr(1)}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
            <Divider/>
          </Grid.Row>
        )
      })

    return (
      <Grid style={{maxHeight: '85vh'}}>
        <Grid.Column width={11}>
          <Segment style={{height: '80vh', overflowY: 'scroll'}}>
            <Grid.Row style={{height: '60vh', backgroundColor: 'red'}}>
            </Grid.Row>
            <Grid.Row style={{marginTop: '1em', height: '15vh'}}>
              <Form onSubmit={this.handleSubmit}>
                <TextArea
                  name='postMessage'
                  value={this.props.chatBox.content ? this.props.chatBox.content : ''}
                  onChange={this.handleChange}
                  autoHeight
                  disabled={this.props.chatBox.match_uuid ? false : true}
                  placeholder='Send message'
                />
                <Button
                  disabled={this.props.chatBox.match_uuid ? false : true}
                  floated='right'
                  style={{marginTop: '1em'}}
                >
                  Send
                </Button>
              </Form>
            </Grid.Row>
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment style={{height: '80vh', overflowY: 'scroll'}}>
            {matchCards}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    userIn: state.logSign.user,
    appUser: state.app.user,
    matches: state.app.matches,
    chatBox: state.app.chatBox
  };
}

export default connect(
  mapStateToProps,
)(Chat);
