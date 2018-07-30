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

var fakeType = new GraphQLObjectType({
  name: 'Fakes',
  fields: {
    id: { type: GraphQLInt },
    uuid: { type: GraphQLString },
    reporter_uuid: { type: GraphQLString },
    reported_at: { type: GraphQLString },
  }
})

module.exports = fakeType;
