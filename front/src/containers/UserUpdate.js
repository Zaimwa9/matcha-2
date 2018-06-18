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

  handleUpdateMode = () => {
    this.props.setUpdateMode(this.props.infoBlock.updateMode);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted');
    console.log(this.props.appUser)
    this.props.submitUpdateUser(this.props.appUser)
  }

  handleChangeDate = (event) => {
    console.log(event)
  }

  handleChange = (event, {name, value}) => {
    this.props.updateUserField(this.props.appUser, name, value);
  }

  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]

    const fakeHash = [
      { key: 1, uuid: 1, content: "drinks" },
      { key: 2, uuid: 1, content: "bitch" },
      { key: 3, uuid: 1, content: "football" },
      { key: 5, uuid: 1, content: "beach" },
      { key: 6, uuid: 1, content: "beach" },
      { key: 7, uuid: 1, content: "beach" },
      { key: 8, uuid: 1, content: "beach2" }
    ];

    const popularity = 74;
    const rating = Math.round((popularity / 100) * 5 * 2) / 2;
    console.log(this.props)
    return (
      <Segment textAlign="center">
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
                  {/* <DatePicker
                    selected={moment()}
                    value={moment()}
                    name='age'
                    onChange={this.handleChangeDate}
                  /> */}
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
          {fakeHash.length > 0 ? <TagCloud hashtags={fakeHash} /> : ""}
          <Item.Group>
            <Item>
              <Item.Content>
                <Icon
                  className="actionIcon"
                  // color='black'
                  // size='mini'
                  // inverted
                  name="edit"
                  // size='small'
                  color="black"
                  style={{ float: "left" }}
                  onClick={this.handleUpdateMode}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
    );
  }

  static propTypes = {
    setUpdateMode: PropTypes.func.isRequired,
    updateUserField: PropTypes.func.isRequired
  };
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    infoBlock: state.app.infoBlock
  };
}

export default connect(mapStateToProps)(UserUpdate);
