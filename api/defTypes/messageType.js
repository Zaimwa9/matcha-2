const _ = require('lodash');
const psql = require('../db/dbconnect.js');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var messageType = new GraphQLObjectType ({
  name: 'Messages',
  fields: {
    id: { type: GraphQLInt },
    author_uuid: { type: GraphQLString },
    receiver_uuid: { type: GraphQLString},
    content: { type: GraphQLString },
    sent_at : { type: GraphQLString },
  }
})

module.exports = messageType;
