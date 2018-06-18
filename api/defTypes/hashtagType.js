const _ = require('lodash');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var hashtagType = new GraphQLObjectType({
  name: 'Hashtag',
  fields: {
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    uuid: { type: GraphQLString },
  }
})

module.exports = hashtagType;