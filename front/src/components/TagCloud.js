import React, { Component } from 'react';

import { Item, Icon } from 'semantic-ui-react';

import _ from 'lodash';
import PropTypes from 'prop-types';

const DeleteIcon = () => {
  return (
    <Icon
      style={{paddingLeft:'1em'}}
      size='small'
      name='delete'
      color='black'
      circular
    />
  )
}

class TagCloud extends Component {

  generateHashRow = (hash) => {
    return (
      <Item>
        {hash}
      </Item>
    )
  }

  chunkHash = (hashArr, index) => {
    if (index === 0) {
      return (
        _.map(_.chunk(hashArr, 4)[0], hash => {
          return (
            <Item.Content key={hash.id}>
              {/* <div className='hashtagsTop'> */}
               {`#${hash.content}`}
               {this.props.visible === 'true' ? <DeleteIcon /> : ''}
              {/* </div> */}
            </Item.Content>
          )
        })
      )
    } else {
      return (
        _.map(_.chunk(hashArr, 4)[1], hash => {
          return (
            <Item.Content key={hash.id}>
              {`#${hash.content}`}
              {this.props.visible === 'true' ? <DeleteIcon /> : ''}
            </Item.Content>
          )
        })
      )
    }
  }

  render () {
    return (
      <Item.Group>
        {this.props.hashtags.length > 0 ? this.generateHashRow(this.chunkHash(this.props.hashtags, 0)) : ''}
        {this.props.hashtags.length > 4 ? this.generateHashRow(this.chunkHash(this.props.hashtags, 1)) : ''}
      </Item.Group>
    )
  }

  static propTypes = {
    hashtags: PropTypes.array.isRequired,
    visible: PropTypes.string.isRequired,
  }
}

export default TagCloud;