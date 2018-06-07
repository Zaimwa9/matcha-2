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

const commentType = require('./commentType')
const psql = require('../db/dbconnect.js');

var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: new GraphQLNonNull(GraphQLString)},
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    password: {
      type: GraphQLString,
      resolve : async () => null
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: GraphQLString },
    uuid: { type: GraphQLString },
    age: { type: GraphQLInt },
    token: { type: GraphQLString },
    gender: { type: GraphQLString },
    created_at: { type: GraphQLString },
    messages: {
      type: new GraphQLList(commentType),
      resolve: async (User) => {
        textQuery = `SELECT * FROM messages where author=${User.id}`;
        try {
          const data = await psql.query(textQuery)
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },
  }
})

module.exports = userType;
