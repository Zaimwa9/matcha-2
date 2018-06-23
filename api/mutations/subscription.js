const hashType= require('../defTypes/hashtagType');
const NewHash = require('./newHash');
const pubsub = require('./serverConfig');
const { withFilter } = require('graphql-subscriptions');


const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    newHash: {
      type: hashType,
      subscribe: () => pubsub.asyncIterator('newHash'),
      resolve: (root, args, context) => {
        return root
      },
    }
    //NewHash
    /*newHash: {
      type: hashType,
      subscribe: () => pubsub.asyncIterator('newHash'),
      resolve: (_, test) => {
        console.log(test)
      }
    }*/
  },
})

module.exports = subscriptionType
