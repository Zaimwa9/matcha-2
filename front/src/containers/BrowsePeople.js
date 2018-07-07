import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from "react-slick";
import _ from 'lodash';
import { Image, Icon, Header, Item } from 'semantic-ui-react';

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
    if (this.props.profile.likesyou === 1) {
      return (
        <Header as='h3' style={{marginTop: '0em'}}>Pssst, I like you ;)</Header>
      )
    }
  }

  render() {
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
                {`${this.props.profile.gender.substr(0, 1).toUpperCase()}`}
              </Item.Description>
              <Item.Meta>Popularity</Item.Meta>
              <Item.Description>
                <strong></strong>
              </Item.Description>
              <Item.Description>
                {`${this.props.profile.description ? this.props.profile.description : ''}`}
              </Item.Description>

            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}

export default BrowsePeople;
