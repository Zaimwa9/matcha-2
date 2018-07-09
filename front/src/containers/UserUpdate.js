import React, { Component } from "react";
import { connect } from "react-redux";

import TagCloud from "../components/TagCloud";
import LocationSearchInput from '../components/LocationSearchInput';
import DatePicker from 'react-datepicker';

import {
  Segment,
  Form,
  Button,
  Input,
  Item,
  Divider,
  Icon,
  Select,
  Modal,
} from "semantic-ui-react";
import 'react-datepicker/dist/react-datepicker.css';

//import _ from "lodash";
import moment from 'moment';
import PropTypes from "prop-types";

class UserUpdate extends Component {

  componentWillUnmount = () => {
    this.props.resetUpdate();
  }

  handleUpdatePwd = (event, {name, value}) => {
    this.props.updatePwd(name, value);
  }

  handleSubmitUpdatePwd = () => {
    this.props.submitPwdUpdate(this.props.appUser.uuid, this.props.pwdState.oldPwd, this.props.pwdState.newPwd);
  }

  handleUpdateMode = () => {
    this.props.setUpdateMode(this.props.infoBlock.updateMode);
  };

  handleSubmitHash = (event) => {
    this.props.postHashtag({uuid: this.props.appUser.uuid, content: this.props.appUser.addinghash}, this.props.appUser.hashtags);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitUpdateUser(this.props.appUser)
  }

  handleChangeDate = (event) => {
    this.props.updateUserField(this.props.appUser, 'age', event.format('X'));
  }

  handleChange = (event, {name, value}) => {
    this.props.updateUserField(this.props.appUser, name, value);
  }

  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]

    const orientation = [
      { key: 'bi', text: 'Bi', value: 'Bi' },
      { key: 'hetero', text: 'Hetero', value: 'Hetero' },
      { key: 'gay', text: 'Gay', value: 'Gay' },
    ]

    const hashtags = (this.props.appUser.hashtags ? this.props.appUser.hashtags : [])

    return (
      <Segment textAlign="center">
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as='h2'>Profile</Item.Header>
                <Icon
                  className="actionIcon"
                  name={this.props.infoBlock.updateMode ? "cancel" : "edit"}
                  color="black"
                  style={{ float: "right" }}
                  onClick={this.handleUpdateMode}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group style={{justifyContent:'center'}}>
                {" "}
                <Form.Input
                  width={6}
                  style={{maxHeight: 30}}
                  label='First Name'
                  value={this.props.appUser.first_name}
                  name='first_name'
                  onChange={this.handleChange}
                />
                <Form.Input
                  width={6}
                  style={{maxHeight: 30}}
                  label='Last Name'
                  value={this.props.appUser.last_name}
                  name='last_name'
                  onChange={this.handleChange}
                />
              </Form.Group>
  {/*            <Form.Group style={{justifyContent:'center'}}>
                <Form.Input
                  width={6}
                  style={{maxHeight: 30}}
                  label='Last Name'
                  value={this.props.appUser.last_name}
                  name='last_name'
                  onChange={this.handleChange}
                />
              </Form.Group>
  */}
              <Form.Group style={{justifyContent:'center'}}>
                <Form.Input
                  width={6}
                  style={{maxHeight: 30}}
                  label='Email'
                  value={this.props.appUser.email}
                  name='email'
                  onChange={this.handleChange}
                />
                <Form.Field
                  onChange={this.handleChange}
                  width={4}
                  style={{maxHeight: 30}}>
                    <label>Orientation</label>
                    <Select
                      width={2}
                      label='Orientation'
                      name='orientation'
                      options={orientation}
                      value={this.props.appUser.orientation}
                      placeholder={this.props.appUser.orientation}
                      onChange={this.handleChange}
                    />
                </Form.Field>
              </Form.Group>
              <Form.Group style={{justifyContent:'center'}}>
                <Form.Field>
                  <label>Address</label>
                  <LocationSearchInput
                    updateUserField={this.props.updateUserField}
                  />
              </Form.Field>
              </Form.Group>
              <Form.Group style={{justifyContent:'space-evenly'}}>
                <Form.Field
                  onChange={this.handleChange}
                  width={4}
                  style={{maxHeight: 30}}>
                    <label>Gender</label>
                    <Select
                      width={2}
                      label='Gender'
                      name='gender'
                      options={options}
                      value={this.props.appUser.gender}
                      placeholder={this.props.appUser.gender}
                      onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field width={5}>
                  <label>Birthday</label>
                  <DatePicker
                    selected={moment.unix(this.props.appUser.age)}
                    name='age'
                    onChange={this.handleChangeDate}
                  />
                </Form.Field>
              </Form.Group>

              <Modal trigger={<p>Modify Password</p>} basic size='small' closeIcon>
                <Modal.Header>Modify Password</Modal.Header>
                <Segment>
                <Modal.Content>
                  <Modal.Description>
                    <Form size='small' onSubmit={this.handleSubmitUpdatePwd}>
                      <Form.Input
                        type='password'
                        name='oldPwd'
                        label='Current password'
                        onChange={this.handleUpdatePwd}
                      />
                      <Form.Input
                        type='password'
                        name='newPwd'
                        label='New password'
                        onChange={this.handleUpdatePwd}
                      />
                      <Button>Save</Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
                </Segment>
              </Modal>

              <Button>
                Save
              </Button>
            </Form>
          <Divider />
          {hashtags.length > 0 ? <TagCloud hashtags={hashtags} visible={'true'} deleteHashtag={this.props.deleteHashtag}/> : ""}
          <Item.Group>
            <Item style={{justifyContent:'center'}}>
              <Input
                disabled={hashtags.length >= 8}
                action={<Button color= 'black' icon= 'plus' onClick={this.handleSubmitHash}/>}
                actionPosition='left'
                name='addinghash'
                placeholder={hashtags.length >= 8 ? 'Max 8 tags' : 'Add Hashtag...'}
                size='small'
                value={this.props.appUser.addinghash ? this.props.appUser.addinghash: ''}
                onChange={this.handleChange}
              />
            </Item>
          </Item.Group>
        </Segment>
    );
  }

  static propTypes = {
    setUpdateMode: PropTypes.func.isRequired,
    updateUserField: PropTypes.func.isRequired,
    resetUpdate: PropTypes.func.isRequired,
    submitUpdateUser: PropTypes.func.isRequired,
    postHashtag: PropTypes.func.isRequired
  };
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    infoBlock: state.app.infoBlock,
    pwdState: state.app.updatePwd,
  };
}

export default connect(
  mapStateToProps
)(UserUpdate);
