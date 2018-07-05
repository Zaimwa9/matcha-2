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
    reported_count: { type: GraphQLInt },
  }
})

module.exports = fakeType;
