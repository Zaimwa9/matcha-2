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
    uid: { type: GraphQLInt },
    firstname: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    created_at: { type: GraphQLString },
    messages: {
      type: new GraphQLList(commentType),
      resolve: async (User) => {
        textQuery = `SELECT * FROM messages where author=${User.uid}`;
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
