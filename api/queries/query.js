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
        uid: { type: GraphQLInt }
      },
      resolve: async function (_, args) {
        textQuery = `SELECT * FROM users where uid=${args.id}`
        return await psql.query(textQuery).rows;
      }
    },
    users: {
      type: new GraphQLList(userType),
      resolve: async function () {
        textQuery = `SELECT * FROM users`
        const data = await psql.query(textQuery);
        return data.rows;
      }
    }
  }
});

module.exports = queryType;