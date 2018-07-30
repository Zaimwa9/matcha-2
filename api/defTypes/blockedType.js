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

var blockedType = new GraphQLObjectType({
  name: 'Blocked',
  fields: {
    id: { type: GraphQLInt },
    uuid: { type: GraphQLString },
    blocked_uuid: { type: GraphQLString },
    blocked_at: { type: GraphQLString },
  }
})

module.exports = blockedType;
