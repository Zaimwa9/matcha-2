import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import _ from 'lodash';
import moment from 'moment';

import { Image, Header, Item } from 'semantic-ui-react';

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

class BrowsePeople extends Component {

  likesYou = () => {
    if (this.props.profile.likesyou === 1 && this.props.profile.is_liked === 0) {
      return (
        <p style={{marginTop: '0em'}}>Pssst, I like you ;)</p>
      )
    } else if (this.props.profile.likesyou === 1 && this.props.profile.is_liked === 1) {
      return (
        <p style={{marginTop: '0em'}}>We matched !</p>
      )
    }
  }

  render() {
    var active = ''
    if (moment().diff(moment(this.props.profile.active), 'minutes') < 2) {
      active = 'Active'
    } else if (moment().diff(moment(this.props.profile.active), 'minutes') > 2
        && moment().diff(moment(this.props.profile.active), 'minutes') < 60) {
          active = `Last seen: ${moment().diff(moment(this.props.profile.active), 'minutes')} minutes ago`;
    } else {
      active = moment(this.props.profile.active).from(moment());
    }

    const pictures = _.map(this.props.profile.pictures, picture => {
      return (
        <div key={picture.id}>
          <Image
            style={{marginRight: 'auto', marginLeft: 'auto'}}
            src={picture.path}
            size='medium'
          />
        </div>
      )
    })

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div style={{maxWidth: '60%', marginRight: 'auto', marginLeft: 'auto'}}>
        <Header as='h1'>{`${this.props.profile ? this.props.profile.first_name.substr(0, 1).toUpperCase() : ''}${this.props.profile ? this.props.profile.first_name.substr(1) : ''}`}</Header>
        {this.likesYou()}
        <Slider {...settings}>
          {pictures}
        </Slider>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Description>
                {`${this.props.profile.gender.substr(0, 1).toUpperCase()}${this.props.profile.gender.substr(1)}`}
              </Item.Description>
              <Item.Meta>Overall popularity: {this.props.profile.popularity}</Item.Meta>
              <Item.Description>
                {`${this.props.profile.description ? this.props.profile.description : ''}`}
              </Item.Description>
              <Item.Description>
                {active ? active : ''}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }

  static propTypes = {
    profile: PropTypes.object.isRequired
  }
}

export default BrowsePeople;
