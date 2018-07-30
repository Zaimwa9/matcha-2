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

var visitType = new GraphQLObjectType({
  name: 'Visits',
  fields: {
    id: { type: GraphQLInt },
    visitor_uuid: { type: GraphQLString },
    visited_uuid: { type: GraphQLString },
    visited_at: { type: GraphQLString },
    visit_count: { type: GraphQLInt }
  }
})

module.exports = visitType;
