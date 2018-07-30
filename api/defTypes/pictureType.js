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

var pictureType = new GraphQLObjectType({
  name: 'Picture',
  fields: {
    id: { type: GraphQLInt },
    author_uuid: { type: GraphQLString },
    path: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    posted_at: { type: GraphQLString }
  }
})

module.exports = pictureType;
