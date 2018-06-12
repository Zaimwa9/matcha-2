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
        console.log(args.token)
        return jwt.verify(args.token, 'quentinbaltringue', async (err, data) => {
          if (err) {
            console.log(data)
            throw new Error('Invalid token!')
          } else {
            textQuery = `SELECT * FROM users WHERE uuid='${data.uuid}'`;
            console.log(textQuery)
            try {
              var user = await psql.query(textQuery);
              user = user.rowCount === 1 ? user.rows[0] : null;
              console.log(user)
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
        uuid: { type: GraphQLInt },
        // password: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        textQuery = `SELECT * FROM users WHERE uuid=${args.uuid}`;
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