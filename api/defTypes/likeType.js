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

var likeType = new GraphQLObjectType({
  name: 'Likes',
  fields: {
    id: { type: GraphQLInt },
    liker_uuid: { type: GraphQLString },
    liked_uuid: { type: GraphQLString },
    liked_at: { type: GraphQLString },
  }
})

module.exports = likeType;
