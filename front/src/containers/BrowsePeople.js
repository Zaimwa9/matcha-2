import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from "react-slick";

class BrowsePeople extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
         return (
           <div>
               <h2> Single Item</h2>
               <Slider {...settings}>
                 <div>
                 <img style={{marginRight: 'auto', marginLeft: 'auto'}}src='/annemo.jpg' />
                    <h3>1</h3>
                 </div>
                 <div>
                <img style={{marginRight: 'auto', marginLeft: 'auto'}}src='/annemo.jpg' />
                   <h3>2</h3>
                 </div>
                 <div>
                 <img style={{marginRight: 'auto', marginLeft: 'auto'}}src='/annemo.jpg' />
                    <h3>3</h3>
                 </div>
                 <div>
                   <h3>4</h3>
                 </div>
                 <div>
                   <h3>5</h3>
                 </div>
                 <div>
                   <h3>6</h3>
                 </div>
               </Slider>
             </div>
         );
       }
/*         <Carousel width='700px'
            showThumbs={false}
            showIndicators={false}
            useKeyboardArrows
            className="presentation-mode"
          >
             <div>
                 <img src="https://i.ytimg.com/vi/y9rDN36QbTs/hqdefault.jpg" />
                 <p className="legend">Legend 1</p>
             </div>
             <div>
                 <img src="https://i.ytimg.com/vi/y9rDN36QbTs/hqdefault.jpg" />
                 <p className="legend">Legend 2</p>
             </div>
             <div>
                 <img src="https://i.ytimg.com/vi/y9rDN36QbTs/hqdefault.jpg" />
                 <p className="legend">Legend 3</p>
             </div>
         </Carousel>
       );
   }*/
}

function mapStateToProps(state) {
  return {
    userIn: state.logSign.user,
    menu: state.app.menu,
    appUser: state.app.user
  };
}

export default connect(
  mapStateToProps,
)(BrowsePeople);
