import React, { Component } from "react";
import { connect } from "react-redux";

import Rating from "react-rating";
import TagCloud from "../components/TagCloud";
import DatePicker from 'react-datepicker';
import {
  Segment,
  Form,
  Button,
  Input,
  Item,
  Divider,
  Popup,
  Icon,
  Select,
} from "semantic-ui-react";
import 'react-datepicker/dist/react-datepicker.css';

import _ from "lodash";
import moment from 'moment';
import PropTypes from "prop-types";

class UserUpdate extends Component {

  componentWillUnmount = () => {
    this.props.resetUpdate();
  }

  handleUpdateMode = () => {
    this.props.setUpdateMode(this.props.infoBlock.updateMode);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitUpdateUser(this.props.appUser)
  }

  handleChangeDate = (event) => {
    console.log(event.format('X'))
    var test = event.format('X')
    console.log(moment.unix(test).format('DD-MM-YYYY'))
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

    const hashtags = this.props.appUser.hashtags

    const popularity = 74;
    const rating = Math.round((popularity / 100) * 5 * 2) / 2;
    return (
      <Segment textAlign="center">
          <Item.Group>
            <Item>
              <Item.Content>
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
          <Item>
            <Item.Image
              src="/annemo.jpg"
              centered
              size="medium"
              rounded
              style={{marginBottom: '1em'}}
            />
          </Item>
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
              </Form.Group>
              <Form.Group style={{justifyContent:'center'}}>
                <Form.Input
                  width={6}
                  style={{maxHeight: 30}}
                  label='Last Name'
                  value={this.props.appUser.last_name}
                  name='last_name'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group style={{justifyContent:'center'}}>
                <Form.Input
                  width={6}
                  style={{maxHeight: 30}}
                  label='Email'
                  value={this.props.appUser.email}
                  name='email'
                  onChange={this.handleChange}
                />
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
              <Button>
                Save
              </Button>
            {/* <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' /> */}
            </Form>
          <Divider />
          <Item.Group relaxed>
            <Item>
              <Item.Content>
                <Popup
                  className="popup"
                  trigger={<Item.Header content="Overall Popularity" />}
                  content="Popularity is a score based on the safety of your account"
                  on="click"
                  size="mini"
                />
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Rating
                  fullSymbol={
                    <img
                      alt="full symbol"
                      src="/black_star.svg"
                      className="rankingIcon"
                    />
                  }
                  emptySymbol={
                    <img
                      alt="empty symbol"
                      src="/empty_star.svg"
                      className="rankingIcon"
                    />
                  }
                  initialRating={rating}
                  readonly
                />
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Item.Header content={`${popularity}%`} />
              </Item.Content>
            </Item>
          </Item.Group>
          {hashtags.length > 0 ? <TagCloud hashtags={hashtags} /> : ""}
        </Segment>
    );
  }

  static propTypes = {
    setUpdateMode: PropTypes.func.isRequired,
    updateUserField: PropTypes.func.isRequired,
    resetUpdate: PropTypes.func.isRequired,
    submitUpdateUser: PropTypes.func.isRequired,
  };
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    infoBlock: state.app.infoBlock,
  };
}

export default connect(mapStateToProps)(UserUpdate);
