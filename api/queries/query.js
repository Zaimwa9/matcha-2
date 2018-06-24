const _ = require('lodash');
const userType = require('../defTypes/userType');
const psql = require('../db/dbconnect.js');
const jwt = require('jsonwebtoken');

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
    checkToken: {
      type: userType,
      args: {
        token: { type: GraphQLString }
      },
      resolve: async function(root, args) {
        return jwt.verify(args.token, 'quentinbaltringue', async (err, data) => {
          if (err) {
            throw new Error('Invalid token!')
          } else {
            textQuery = `SELECT * FROM users WHERE uuid='${data.uuid}'`;
            try {
              var user = await psql.query(textQuery);
              user = user.rowCount === 1 ? user.rows[0] : null;
              return await user;
            } catch (e) {
              console.log(e);
              throw (e)
            }
          }
        })
      }
    },
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        uuid: { type: GraphQLString },
        // password: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        textQuery = `SELECT * FROM users WHERE uuid='${args.uuid}'`;
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
    },

    feedUsers: {
      type: new GraphQLList(userType),
      resolve: async function () {
        textQuery = ``
      }
    }
  }
});

module.exports = queryType;
