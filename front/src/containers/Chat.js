import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import { Grid, Divider, Form, TextArea, Button, Segment, Item } from 'semantic-ui-react';

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
    this.props.getMessages(uuid);
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

    var myPreMessages = this.props.messages;
    myPreMessages = _.map(myPreMessages, message => {
      message.sent_at = moment(message.sent_at).unix();
      return message;
    })

    var myMessages = _.orderBy(myPreMessages, ['sent_at'], ['asc']);
    myMessages = _.uniqBy(myMessages, message => {
      return message.id;
    });

    const messages =
      _.map(myMessages, message => {
        if (message.author_uuid === this.props.appUser.uuid) {
          return (
            <Segment key={message.id} color='black'>
              <Grid.Column style={{textAlign:'right'}}>
                  <Item.Group>
                    <Item.Content>
                      <p style={{fontSize: 16, marginBottom: 0}}>
                        {message.content}
                      </p>
                      <Item.Extra floated='right'>
                        {moment.unix(message.sent_at).format('DD-MM-YYYY HH:mm')}
                      </Item.Extra>
                    </Item.Content>
                  </Item.Group>
              </Grid.Column>
            </Segment>
          )
        } else {
          return (
            <Segment key={message.id} color='blue'>
              <Grid.Column key={message.id} style={{textAlign:'left'}}>
                  <Item.Group>
                    <Item.Content>
                      <p style={{fontSize: 16, marginBottom: 0}}>
                        {message.content}
                      </p>
                      <Item.Extra floated='left'>
                        {moment.unix(message.sent_at).format('DD-MM-YYYY HH:mm')}
                      </Item.Extra>
                    </Item.Content>
                  </Item.Group>
              </Grid.Column>
            </Segment>
          )
        }
      })

    return (
      <Grid style={{maxHeight: '85vh'}}>
        <Grid.Column width={11}>
          <Segment style={{height: '80vh'}}>
            <Grid.Row style={{height: '60vh', overflow: 'auto'}} width={2}>
              {messages}
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
          <Segment style={{height: '80vh', overflow: 'auto'}}>
            {matchCards}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }

  static propTypes = {
    getMatches: PropTypes.func.isRequired,
    writeMessage: PropTypes.func.isRequired,
    postMessage: PropTypes.func.isRequired,
    switchChat: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  }
}

function mapStateToProps(state) {
  return {
    userIn: state.logSign.user,
    appUser: state.app.user,
    matches: state.app.matches,
    chatBox: state.app.chatBox,
    messages: state.app.chatBox.messages
  };
}

export default connect(
  mapStateToProps,
)(Chat);
