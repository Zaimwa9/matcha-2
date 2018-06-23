const hashType = require('../defTypes/hashtagType');
const { withFilter } = require('graphql-subscriptions');

const { pubsub } = require('./serverConfig');

NewHash = {
  type: hashType,
  subscribe: () => pubsub.asyncIterator('newHash'),
  resolve: (payload) => {
    console.log('plz')
    return payload
  },
}

module.exports = NewHash
