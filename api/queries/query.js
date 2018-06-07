const _ = require('lodash');
const userType = require('../defTypes/userType');
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

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: GraphQLInt },
        // password: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        textQuery = `SELECT * FROM users WHERE id=${args.id}`;
        try {
          const data = await psql.query(textQuery);
          return data.rows[0];
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },
    users: {
      type: new GraphQLList(userType),
      resolve: async function () {
        textQuery = `SELECT * FROM users`;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    }
  }
});

module.exports = queryType;