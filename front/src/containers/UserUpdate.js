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

  render() {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]

    const fakeHash = [
      { key: 1, uuid: 1, content: "drinks" },
      { key: 2, uuid: 1, content: "bitch" },
      { key: 3, uuid: 1, content: "football" },
      { key: 4, uuid: 1, content: "beach" },
      { key: 4, uuid: 1, content: "beach" },
      { key: 4, uuid: 1, content: "beach" },
      { key: 4, uuid: 1, content: "beach2" }
    ];
    const popularity = 74;
    const rating = Math.round((popularity / 100) * 5 * 2) / 2;

    return (
      <Form >
        <Segment textAlign="center">
          <Item>
            <Item.Image
              src="http://mradio.fr/media/news/thumb/870x489_jessica-alba-bb.jpg"
              centered
              size="medium"
              rounded
              style={{marginBottom: '1em'}}
            />
          </Item>
                <Form.Group style={{justifyContent:'center'}}>
                  <Form.Input width={6} style={{maxHeight: 30}} label='First Name' />
                  {" "}
                  <Form.Input width={6} style={{maxHeight: 30}} label='Last Name' />
                </Form.Group>
              <Form.Group style={{justifyContent:'center'}}>
                <Form.Input width={10} style={{maxHeight: 30}} label='Email' />
              </Form.Group>
              <Form.Group style={{justifyContent:'space-evenly'}}>
                <Form.Field width={4} style={{maxHeight: 30}}>
                  <label>Gender</label>
                  <Select width={2} control={Select} label='Gender' options={options} placeholder='Gender' />
                </Form.Field>
                <Form.Field width={5}>
                  <label>Birthday</label>
                  <DatePicker
                    selected={moment()}
                    // onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>
            {/* <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' /> */}
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
      </Form>
    );
  }

  static PropTypes = {
    setUpdateMode: PropTypes.func.isRequired
  };
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
    infoBlock: state.app.infoBlock
  };
}

export default connect(mapStateToProps)(UserUpdate);
